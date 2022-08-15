const app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http)

http.listen(8080)

app.get('/', (request, response) => {
  // response.send('Hello, World!')
  response.sendFile(__dirname + '/index.html')
})

// "connection" event fires every time someone connects to the server
/**
 * Событие `connection` происходит каждый раз когда кто-то подсоединяется к серверу. Обработчику передаётся конкретный сокет, т.е. то соединение которое было установлено.
 * */
io.sockets.on('connection', socket => {
  console.info('Connection successful...')

  // Послать сообщение с сервера на клиент
  socket.emit('message', {hello: 'world'})

  // Обработать сообение с клиента
  socket.on('message', msg => {
    console.log(msg)
  })
})
