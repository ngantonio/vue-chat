import express, { json } from "express";
import connectDB from './config/db.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

import messagesRoutes from './src/routes/Message.routes.js'
import authRoutes from './src/routes/Auth.routes.js'
import indexRoute from './src/routes/Index.routes.js'

import {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} from './src/users.js';

import { setInstance } from './src/socketHandler.js'

// create server
const PORT = process.env.PORT || 4000;
const api = express();
const httpServer = createServer(api); 

// connect to DB
connectDB();

// cors enabling
api.use(cors());

// configure middlewares
api.use(json({extended: true }))

// Create and configure routes and Endpoints 
api.use('/', indexRoute)
api.use('/api/messages', messagesRoutes)
api.use('/api/auth', authRoutes)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET,PUT,POST,DELETE,OPTIONS"],
    allowedHeaders: ["Access-Control-Allow-Headers", "Content-Type", "Authorization", "Content-Length", "X-Requested-With"],
    credentials: true
  }
});
  
io.on('connect', (socket) => {
  console.log("We have a new connection :)");

  socket.on('join', ({ username }, callback) => {

    console.log(username);
    const {error, user } =  addUser( {id: socket.id , username, room: "liveroom"} )
    
    if (error) return callback(error)
    
    // le da la bienvenida al usuario que se conectó
    socket.emit('NEW_MESSAGE', { username: 'admin', text: `@${user.username}, welcome to the room`, createdAt: new Date});
    // Le dice a todos los usuarios de su sala que el nuevo usuario se ha unido
    socket.broadcast.to("liveroom").emit('NEW_MESSAGE', { username: 'admin', text: `@${user.username}, has joined!`, createdAt: new Date });
    socket.join(user.room);
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom("liveroom") })

    callback();
  })

  setInstance(io)
  // emmitMessage(socket);

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to("liveroom").emit('NEW_MESSAGE', { username: 'admin', text: `@${user.username}, has left!`, createdAt: new Date });
    }
    
  })
})


httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))
