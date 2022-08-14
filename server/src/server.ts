import { IMessage } from './types';
import { Server } from 'socket.io';

const io = new Server(3333, {
  cors: {
    origin: [
      'http://localhost:8080',
      'http://192.168.0.53:8080'
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

  socket.on('disconnect', () => {
    console.log('%c'+ `disconnect: ${socket.id}`, 'color: red')
  })
})


