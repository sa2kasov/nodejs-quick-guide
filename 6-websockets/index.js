const app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      express = require('express')

http.listen(8080)

app.set('views', __dirname)
app.set('view engine', 'pug')
app.engine('pug', require('pug').__express)
app.use(express.static(__dirname + '/folder'))

app.get('/', (request, response) => {
  // response.send('Hello, World!')
  // response.sendFile(__dirname + '/index.html')
  response.render('template')
})

// "connection" event fires every time someone connects to the server
/**
 * Событие `connection` происходит каждый раз когда кто-то подсоединяется к серверу. Обработчику передаётся конкретный сокет, т.е. то соединение которое было установлено.
 * */

// Послать сообщение всем подключённым сокетам
io.sockets.emit('greetings', {text: 'Everybody hello!'})

io.sockets.on('connection', socket => {
  console.info('Connection successful...')

  // Обработать сообщение с клиента
  socket.on('message', msg => {
    // Установка «внутренней переменной» сокета
    /*socket.on('set nickname', msg => {
      socket.nickname = msg
    })*/
    socket.nickname = msg
    // Послать сообщение с сервера на клиент
    socket.emit('greetings', {text: `Hello back, ${msg}`})
    // Отправить сообщение всем, кроме текущего сокета
    socket.broadcast.emit('greetings', {text: `Hello everyone from ${msg}`})
  })

  socket.on('new-message', msg => {
    socket.emit('greetings', {text: `Hey there, ${msg}`})
    socket.broadcast.emit('greetings', {text: `${socket.nickname} is ${msg} now`})
    socket.nickname = msg

    // Old way to get a socket variable
    /*socket.get('nickname', (err, oldName) => {
      socket.broadcast.emit('greetings', {text: `${oldName} теперь ${msg}`})
      socket.set('nickname', msg)
    })*/
  })

  socket.on('request', msg => {
    io.sockets.emit('response', {text: `You've just reported: ${msg.text}`})
  })

  socket.on('disconnect', () => io.sockets.emit('greetings', {text: '1 пользователь отсоединён'}))
})
