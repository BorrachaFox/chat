import { io } from 'socket.io-client'
const socket = io('http://192.168.0.53:3000')

import { renderMessage } from './utils'

socket.on('receivedMessage', (message) => {
  renderMessage(message)
})

socket.on('previousMessages', (messages) => {
  for (let message of messages) {
    renderMessage(message)
  }
})

socket.on('isTyping', (data) => {
  console.log(data)
})

export { socket }