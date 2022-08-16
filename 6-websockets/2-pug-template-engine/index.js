const app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      express = require('express')

http.listen(8080)

app.set('views', __dirname)
app.set('view engine', 'pug')
app.engine('pug', require('pug').__express)
app.use(express.static(__dirname + '/js'))

app.get('/', (request, response) => {
  response.render('template')
})

io.sockets.emit('write', {text: 'Everybody hello!'})

io.sockets.on('connection', socket => {
  console.info('Connection successful...')

  socket.on('message', msg => {
    socket.nickname = msg
    socket.emit('write', {text: `Hello back, ${msg}`})
    socket.broadcast.emit('write', {text: `Hello everyone from ${msg}`})
  })

  socket.on('new-message', msg => {
    socket.emit('write', {text: `Hey there, ${msg}`})
    socket.broadcast.emit('write', {text: `${socket.nickname} is ${msg} now`})
    socket.nickname = msg
  })

  socket.on('request', msg => {
    io.sockets.emit('response', {text: `You've just reported: ${msg.text}`})
  })

  socket.on('disconnect', () => io.sockets.emit('write', {text: '1 пользователь отсоединён'}))
})
