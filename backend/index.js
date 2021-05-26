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
const message = require('./models/messageModel');
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
.then(res=>{
   io.on('connection', (socket)=>{
       console.log('User Connected');

       //add user to online users list
       socket.on('addUser', (userId)=>{
           addUser(userId, socket.id);
           io.emit('getUsers', users)
       })

       //send and get message from user
       socket.on('sendMessage', ({senderId, recieverId, text})=>{
           const user = getUser(recieverId);
           io.to(user.socketId).emit("getMessage", {
               senderId,
               text
           })
       })

       //on user disconnect 
       socket.on('disconnect', ()=>{
           console.log("A user disconnected");
           removeUser(socket.id);
           io.emit('getUsers', users)
       })
   })
})