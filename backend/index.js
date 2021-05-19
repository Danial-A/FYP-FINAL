require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http')
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server,{
    cors:{
        origin:"*"
    }
})
const port = process.env.PORT || 8080;
//Connect to the database

const db = mongoose.connection;
db.on('open', ()=>{console.log("Database connection successful")})
db.on('error', console.error.bind(console, "Connection Error: "))
//Middlewares
app.use(cors())
app.use(express.json())


//Routes Import
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes' )
const groupRoutes = require('./routes/groupsRoutes')
const roomRoutes = require('./routes/roomRoutes')
const messageRoutes = require('./routes/messageRoutes')
const privateRoutes = require('./routes/privateChatRoutes')

//API Middleware
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/groups',groupRoutes)
app.use('/rooms',roomRoutes)
app.use('/chats',privateRoutes)
app.use('/messages',messageRoutes)



server.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})

//socket.io work
const message = require('./models/messageModel')
let onlineUsers = []
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
.then(res=>{
    //Socket io logic
    io.on('connection', (socket)=>{
        console.log("new user connection")
        const {userid,username} = socket.handshake.query
        let filterOnlineUsers = onlineUsers.filter(user=>{
            return user.userid !== userid
        })
        if(socket.handshake.query.userid){
            onlineUsers = [...filterOnlineUsers, {userid,username, socketid:socket.id}]
        }
    //new request for online users
    socket.on('RequestOnlineUsers', ()=>{
        socket.emit('onlineUsers', onlineUsers);
        socket.broadcast.emit('onlineUsersUpdate',onlineUsers)
    })
    //listen for online users update
    socket.on('updateAndSendOnlineUsers', ()=>{
        socket.broadcast.emit('onlineUsers', onlineUsers)
    })
    //new message 
    socket.on('message', async message_res=>{
        const newMessage = new message({
            sender:message_res.sender,
            reciever:message_res.reciever,
            roomid:message_res.roomid,
            content:message_res.content
        })
        newMessage.save()
        .then(result=>{
            const onlineFriend = onlineUsers.filter(user=>{
                user.userid === message_res.reciever
            })
            if(onlineFriend.length > 0){
                const friendSocketId = onlineFriend[0].socketid
                io.to(`${friendSocketId}`).emit('privateMessage', result)
            }
        }).catch(err=>console.log("new message error : ",err))
    })

    //Disconnected User 
    socket.on('disconnect', socketToClose =>{
        try{
            const {userId} = socket.handshake.query;
            let filteredOnlineUsers = onlineUsers.filter(user=>{
                return user.userid !== userId
            });
            onlineUsers = filteredOnlineUsers
            socket.broadcast.emit('onlineUsersUpdate', filteredOnlineUsers)
        }catch(err){
            console.log(err)
        }
    })

    socket.on('canvas-data', (data)=> {
        socket.broadcast.emit('canvas-data', data);
        
    })

    })
})