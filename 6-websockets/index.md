# Веб-сокеты

Недостаток Ajax (XmlHTTPRequest) в отстутсивии возможности постоянного соединения с сервером для непрерывного обмена данными. WebSockets это самостоятельный, независимый протокол основанный на TCP, главной особенностью которого является возможность поддержки постоянного соединения между клиентом и сервером.

Имея непрерывное соединение становится не обязательным только клиенту запрашивать изменения с сервера, но и сам сервер имеет возможность оправки данных клиенту не дожидаясь от него запросов. Такая работа протокола подходит для разработки сервисов с постоянным обменом, онлайн игры, чаты, биржевые и торговые площадки и т.д.

## Socket.io

Лидером среди библиотек для обмена данными в реальном времени является JavaScript-библиотека Socket.io, работающая на протоколе WebSocket. Серверная часть работает в среде Node.js, клиентом выступает браузер.

### Сервер

Событие `connection` происходит каждый раз когда кто-то подсоединяется к серверу. Обработчику передаётся конкретный сокет, т.е. то соединение которое было установлено.

```javascript
const app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http)

http.listen(8080)

app.get('/', (request, response) => {
  // response.send('Hello, World!')
  response.sendFile(__dirname + '/index.html')
})

io.sockets.on('connection', socket => {
  console.info('Connection successful...')

  // Послать сообщение с сервера на клиент
  socket.emit('message', {hello: 'world'})

  // Обработать сообение с клиента
  socket.on('message', msg => {
    console.log(msg)
  })
})

```

### Клиент

Запрос в `src` автоматически находит дирректорию `socket.io` даже если она явно не находится в корневой папке проекта.

```html
<script src="/socket.io/socket.io.js"></script>
```

Клиент обрабатывает события зарегистрированные на стороне сервера, а также посылает свои собщения обратно.

```javascript
const socket = io.connect('http://localhost:8080')

// Обработать событие «message» с сервера
socket.on('message', msg => {
  document.body.insertAdjacentHTML('beforeend', `<p>${msg.hello}</p>`)
})

// Зарегистрировать своё событие и послать данные на сервер
socket.emit('message', 'Hello back')
```

### Дополнительные манипуляции

**Отправить сообщение всем, кроме текущего сокета**

```javascript
socket.broadcast.emit('event-name', 'some data')
```

**Отправка события с сервера на клиент или наоборот**
```javascript
io.sockets.emit('event-name', 'some data')
```

**Использование «переменных» сокета**

```javascript
io.sockets.on('connection', socket => {
  socket.nickname = 'some data'
})
```

**Событие отсоединения сокета клиента**

```javascript
socket.on('disconnect', () => io.sockets.emit('event-name', {
  message: 'пользователь отсоединён'
}))
```
