import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';

import { IMessage } from './types';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());

const srv = app.listen(PORT, () => console.log(`Online on port ${PORT}`))

const io = new Server(srv, {
  cors: {
    origin: [
      'http://localhost:8080',
      'https://chat-theta.vercel.app/'
    ],
  },
})

let messages: IMessage[] = []

io.on('connection', (socket) => {
  console.log(`connected: ${socket.id}`)

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
    console.log('%c'+ `disconnect: ${socket.id}`, 'color: red')
  })
})


