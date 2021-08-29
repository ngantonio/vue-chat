import express, { json } from "express";
import connectDB from './config/db.js';
import cors from 'cors';
import {Server, Socket} from 'socket.io';
import http from "http";

// import messagesRoutes from './src/routes/Message.routes.js'
import authRoutes from './src/routes/Auth.routes.js'

// create server
const api = express();
const PORT = process.env.PORT || 4000;


const httpServer = http.createServer(api);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET,PUT,POST,DELETE,OPTIONS"],
    allowedHeaders: ["Access-Control-Allow-Headers", "Content-Type", "Authorization", "Content-Length", "X-Requested-With"],
    credentials: true
  }
});
  
  

// connect to DB
connectDB();

// cors enabling
api.use(cors());

// configure middlewares
api.use(json({ limit: "30mb", extended: true }))

// Create and configure routes and Endpoints 
// api.use('/api/messages', messagesRoutes)
api.use('/api/auth', authRoutes)

// server listenind
api.listen(PORT, () => {
  console.log(`Server listen at port ${ PORT }`);
})