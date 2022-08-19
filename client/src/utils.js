import { socket } from "./server"

// App Functions

export function loadPages(user) {
  if(user) {
    document.querySelector('#login-page').style.display = "none"
    document.querySelector('#chat-page').style.display = "block"
  } else {
    document.querySelector('#login-page').style.display = "block"
    document.querySelector('#chat-page').style.display = "none"
  }
}

export function setWriting(username, state) {
  const input = document.querySelector('input[name=message]')

  if(state) { 
    input.style.outline = '1px solid #7DCEA0'
  } else {
    input.style.outline = 'none'
  }

  socket.emit('typingState', {
    username: username,
    typing: state
  })

  return state
}

export function renderTyping(data) {
  let htmlText = ''
  if(data.typing) htmlText = `${data.username} is typing`

  document.querySelector('.typing').innerHTML = htmlText
}

export function renderOnline(n) {
  document.querySelector('.online').innerHTML = `${n} online`
}

export function renderMessage(message) {
  const htmlText = `
    <div class="message">
      <strong><span style="color:${message.color || 'black'}">${message.author}</span></strong>: ${message.message}
    </div>
  `
  document.querySelector('.messages').innerHTML += htmlText
}

// Helper Functions

export function randomColor() {
  
  let hexlist = '0123456789abcd'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += hexlist.charAt(Math.floor(Math.random() * hexlist.length))
  }
  
  return color
}

export function delay(fn, ms) {
  var timer = 0;
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(this, ...args), ms || 0)
  }
}


