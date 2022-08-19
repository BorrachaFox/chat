import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv'

dotenv.config()

import { IMessage } from './types';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

const srv = app.listen(PORT, () => console.log(`Online on port ${PORT}`))

const io = new Server(srv, {
  cors: {
    origin: process.env.CORS_ORIGIN_URL
  },
})

let messages: IMessage[] = []
let connectionCounter: number = 0

io.on('connection', (socket) => {
  connectionCounter++
  console.log(`connected: ${socket.id}: ${connectionCounter}`)

  socket.emit('countOnline', connectionCounter)
  socket.broadcast.emit('countOnline', connectionCounter)
  socket.emit('previousMessages', messages)
  
  socket.on('sendMessage', (data: IMessage) => {
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data)
  })

  socket.on('typingState', (data) => {
    console.log(data)
    socket.broadcast.emit('isTyping', data)
  })

  socket.on('disconnect', () => {
    connectionCounter--
    socket.broadcast.emit('countOnline', connectionCounter)
    console.log(`disconnect: ${socket.id}: ${connectionCounter}`)
  })
})
