# Express

Express — простой, гибкий фреймворк для приложений Node.js, упрощающий разработку веб-приложения, которое может обрабатывать различные типы запросов, например GET, PUT, POST и DELETE.

## Инициализация

```javascript
const express= require('express')
const app = express()
app.listen(8080)
```

## Использование Express

```javascript
const express = require('express')
const app = express()

// Initialization
app.listen(8080)

// Get queries processing
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/expamle.html')
})
```
