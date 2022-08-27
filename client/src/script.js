import { socket } from './server'
import { loadPages, renderMessage, randomColor, delay, setWriting } from './utils'

let username = ''
let color = ''
let writing = false

const messageInput = document.querySelector('input[name=message]')
const usernameInput = document.querySelector('input[name=username]')
const chatPage = document.querySelector('#chat')
const loginPage = document.querySelector('#login')

messageInput.addEventListener('input', () => {
  let hasText = messageInput.value
  if (hasText && !writing) writing = setWriting(username, true)
  if (!hasText && writing) writing = setWriting(username, false)
})

messageInput.addEventListener('keyup', delay(() => {
  if(writing) writing = setWriting(username, false)
}, 2000))

loginPage.addEventListener('submit', (event) => {
  event.preventDefault()
  
  username = usernameInput.value
  color = randomColor()
  
  loadPages(username)
})

chatPage.addEventListener('submit', (event) => {
  event.preventDefault()

  let author = username
  let message = messageInput.value

  if(author.length && message.length) {
    var messageObject = {
      author: username,
      message: message,
      color: color
    }
    renderMessage(messageObject)
    
    socket.emit('sendMessage', messageObject)
  }
  
  let hasText = messageInput.value
  if(hasText) {
    writing = setWriting(username, false)
    messageInput.value = ''
  }
})
