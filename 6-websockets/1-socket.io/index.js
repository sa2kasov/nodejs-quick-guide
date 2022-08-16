const app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http)

http.listen(8080)

app.get('/', (request, response) => {
  // response.send('Hello, World!')
  response.sendFile(__dirname + '/index.html')
})

// Послать сообщение всем подключённым сокетам
io.sockets.emit('print', {text: 'Everybody hello!'})

io.sockets.on('connection', socket => {
  console.info('Connection successful...')

  // Обработать сообщение с клиента
  socket.on('message', msg => {
    // Установка «внутренней переменной» сокета
    socket.nickname = msg
    // Послать сообщение с сервера на клиент
    socket.emit('print', {text: `Hello back, ${msg}`})
    // Отправить сообщение всем, кроме текущего сокета
    socket.broadcast.emit('print', {text: `Hello everyone from ${msg}`})
  })

  socket.on('new-message', msg => {
    socket.emit('print', {text: `Hey there, ${msg}`})
    socket.broadcast.emit('print', {text: `${socket.nickname} is ${msg} now`})
    socket.nickname = msg

    // Old way to get a socket variable
    /*socket.get('nickname', (err, oldName) => {
      socket.broadcast.emit('print', {text: `${oldName} теперь ${msg}`})
      socket.set('nickname', msg)
    })*/
  })

  socket.on('request', msg => {
    io.sockets.emit('response', {text: `You've just reported: ${msg.text}`})
  })

  socket.on('disconnect', () => io.sockets.emit('print', {text: '1 пользователь отсоединён'}))
})
