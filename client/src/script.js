import { io } from 'socket.io-client'
import { loadPages, renderMessage, randomColor } from './utils'

const socket = io('http://192.168.0.53:3333')
let username = ''
let color = ''

socket.on('receivedMessage', (message) => {
  renderMessage(message)
})

socket.on('previousMessages', (messages) => {
  for (let message of messages) {
    renderMessage(message)
  }
})

document.querySelector('#login').addEventListener('submit', (event) => {
  event.preventDefault()
  
  username = document.querySelector('input[name=username]').value
  color = randomColor()
  
  loadPages(username)
})

document.querySelector('#chat').addEventListener('submit', (event) => {
  event.preventDefault()

  let author = username
  let authorColor = color
  console.log('color: ' + color)
  let messageInput = document.querySelector('input[name=message]')
  let message = messageInput.value

  if(author.length && message.length) {
    var messageObject = {
      author: author,
      message: message,
      color: authorColor
    }
    renderMessage(messageObject)

    messageInput.value = ''
    socket.emit('sendMessage', messageObject)
  }
})

randomColor()
/* loadPages() */
