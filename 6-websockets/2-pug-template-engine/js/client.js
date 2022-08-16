window.onload = () => {
  const socket = io.connect('http://localhost:8080')
  document.getElementById('submit').onclick = () => {
    const text = document.getElementById('input').value
    socket.emit('request', {text})
  }

  socket.on('response', msg => {
    if(msg.text) {
      document.getElementById('txt').innerHTML = msg.text
    } else {
      console.log('Something wrong happened in client.js => "response" handler ', msg)
    }
  })
}