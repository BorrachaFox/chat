import { io } from 'socket.io-client'
import { renderTyping, renderOnline } from './utils'
const serverUrl = import.meta.env.VITE_SERVER_URL

const socket = io(serverUrl)

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
  renderTyping(data)
})

socket.on('countOnline', (data) => {
  renderOnline(data)
})

export { socket }
