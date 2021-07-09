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
        origin:"http://localhost:3000"
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
const privateRoutes = require('./routes/privateChatRoutes');
const adminRoutes = require('./routes/adminRoutes')
const reportRoutes = require('./routes/reportRoute')
const feedbackRoutes = require('./routes/feedbackRoutes')
// const feebackRoutes = require('./routes/feedbackRoutes')

//API Middleware
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/groups',groupRoutes)
app.use('/rooms',roomRoutes)
app.use('/chats',privateRoutes)
app.use('/messages',messageRoutes)
app.use('/admin',adminRoutes)
app.use('/reports', reportRoutes)
app.use('/feedbacks', feedbackRoutes)
// app.use('/feedback', feebackRoutes)
app.use('/uploads', express.static('uploads'))



server.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})

//socket.io work
let users = []
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
.then(()=>{
   io.on('connection', (socket)=>{
       console.log(socket.rooms);
        socket.emit("me", socket.id)
       //add user to online users list
       socket.on('addUser', (userId)=>{
           addUser(userId, socket.id);
           io.emit('getUsers', users)
       })

       //send and get message from user
       socket.on('sendMessage', ({senderId, recieverId, text})=>{
           const user = getUser(recieverId);
           const socketid = user ? user.socketId : null;
           io.to(socketid).emit("getMessage", {
               senderId,
               text
           })
       })

       //send and get message to room
       socket.on('groupMessage', ({senderId, room, text})=>{
        io.in(room).emit("getGroupMessage", {
            senderId,
            text
        })
    })
    socket.on('createRoom', (room)=>{
        socket.join(room)
    })

       //audio/video call functionality
       socket.on("callDisconnect", ()=>{
           socket.broadcast.emit("Call ended")
       })

       socket.on('callUser', (data)=>{
           io.to(data.userId).emit("callUser", {signal:data.signalData, from: data.from, name:data.name})
       })

       socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	    })


       //on user disconnect 
       socket.on('disconnect', ()=>{
           console.log("A user disconnected");
           removeUser(socket.id);
           io.emit('getUsers', users)
       })
   })
})