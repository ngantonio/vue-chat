import express, { json } from "express";
import connectDB from './config/db.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

/** Import routes and user management methods */
import messagesRoutes from './src/routes/Message.routes.js'
import authRoutes from './src/routes/Auth.routes.js'

import {
  addUser,
  removeUser,
  getUsersInRoom
} from './src/users.js';

/** Import socket handler */
import { setInstance } from './src/socketHandler.js'

// create server
const PORT = process.env.PORT || 4000;
const api = express();
const httpServer = createServer(api); 

// connect to DB
connectDB();

// cors enabling
api.use(cors());

// configure middleware
api.use(json({extended: true }))

// Create and configure routes and Endpoints 
api.use('/api/messages', messagesRoutes)
api.use('/api/auth', authRoutes)

// create and configure the socket instance 
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET,PUT,POST,DELETE,OPTIONS"],
    allowedHeaders: ["Access-Control-Allow-Headers", "Content-Type", "Authorization", "Content-Length", "X-Requested-With"],
    credentials: true
  }
});
  
// Initialize and make the socket listen to chat events
io.on('connect', (socket) => {
  console.log("We have a new connection ...");

  // Join event: register a user with his soketID and username in the local array of connected users
  socket.on('join', ({ username }, callback) => {

    const { error, user } = addUser({ id: socket.id, username, room: "liveroom" })
  
    if (error) return callback(error)
    
    // Welcomes the user who logged in
    socket.emit('NEW_MESSAGE', { username: 'admin', text: `@${user.username}, welcome to the room!`, createdAt: new Date});
    // Informs all users of his room, exempting him, that the new user has joined
    socket.broadcast.to("liveroom").emit('NEW_MESSAGE', { username: 'admin', text: `@${user.username}, has joined!`, createdAt: new Date });
    // join user to global room
    socket.join(user.room);
    // An event is issued that returns the updated list of users in the global room
    io.to(user.room).emit('LISTEN_ROOM', { room: user.room, users: getUsersInRoom("liveroom") })

    callback();
  })

  /**
   * to be able to emit events after storing a new message in the database, 
   * I need to export the socket instance so that it is accessible to the rest 
   * of the modules of the app
   */
  setInstance(io)

  // It emits the manual disconnection event that removes the user from the list of users in the room
  socket.on('logout', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to("liveroom").emit('NEW_MESSAGE', { username: 'admin', text: `@${user.username}, has left!`, createdAt: new Date });
      io.to(user.room).emit('LISTEN_ROOM', { room: user.room, users: getUsersInRoom("liveroom") })
    }
  })

  // It emits the automatic disconnection event that removes the user from the list of users in the room
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to("liveroom").emit('NEW_MESSAGE', { username: 'admin', text: `@${user.username}, has left!`, createdAt: new Date });
      io.to(user.room).emit('LISTEN_ROOM', { room: user.room, users: getUsersInRoom("liveroom") })
    }
  })
})

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT} listening for connections`))
