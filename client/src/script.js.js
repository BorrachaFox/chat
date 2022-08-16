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
  let isEmpty = messageInput.value
  if(!isEmpty && writing) return writing = setWriting(username, false) 
  if(isEmpty && !writing) writing = setWriting(username, true)
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
  messageInput.value = ''
  setWriting(username, false)
})
