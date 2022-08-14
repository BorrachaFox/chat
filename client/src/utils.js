function loadPages(user) {
  if(user) {
    document.querySelector('#login-page').style.display = "none"
    document.querySelector('#chat-page').style.display = "block"
  } else {
    document.querySelector('#login-page').style.display = "block"
    document.querySelector('#chat-page').style.display = "none"
  }
}

function renderMessage(message) {
  const htmlText = `
    <div class="message">
      <strong><span style="color:${message.color || 'black'}">${message.author}</span></strong>: ${message.message}
    </div>
  `
  document.querySelector('.messages').innerHTML += htmlText
}

function randomColor() {
  let hexlist = '456789abcd'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += hexlist.charAt(Math.floor(Math.random() * hexlist.length))
  }
  
  return color
}

export { loadPages, renderMessage, randomColor }
