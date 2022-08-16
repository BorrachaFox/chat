import { socket } from "./server"

// App Functions

function loadPages(user) {
  if(user) {
    document.querySelector('#login-page').style.display = "none"
    document.querySelector('#chat-page').style.display = "block"
  } else {
    document.querySelector('#login-page').style.display = "block"
    document.querySelector('#chat-page').style.display = "none"
  }
}

function setWriting(username, state) {
  const input = document.querySelector('input[name=message]')

  if(state) { 
    input.style.outline = '1px solid #7DCEA0 '
  } else {
    input.style.outline = 'none'
  }

  socket.emit('typingState', {
    username: username,
    typing: state
  })

  return state
}

function renderMessage(message) {
  const htmlText = `
    <div class="message">
      <strong><span style="color:${message.color || 'black'}">${message.author}</span></strong>: ${message.message}
    </div>
  `
  document.querySelector('.messages').innerHTML += htmlText
}

// Helper Functions

function randomColor() {
  
  let hexlist = '0123456789abcd'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += hexlist.charAt(Math.floor(Math.random() * hexlist.length))
  }
  
  return color
}

function delay(fn, ms) {
  var timer = 0;
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(this, ...args), ms || 0)
  }
}

export { loadPages, renderMessage, randomColor, delay, setWriting }
