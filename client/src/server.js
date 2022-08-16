import { io } from 'socket.io-client'

const serverUrl = (
  'https://chat-borracha.herokuapp.com/'
)

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
  console.log(data)
})

export { socket }
