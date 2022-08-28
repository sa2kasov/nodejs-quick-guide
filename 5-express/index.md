# Express

Express — простой, гибкий фреймворк для приложений Node.js, упрощающий разработку веб-приложения, которое может обрабатывать различные типы запросов, например GET, PUT, POST и DELETE.

Собственная функциональность у Express минимальна, веб-фреймворк служит для маршрутизации и промежуточной обработки данных.

### Contents

1. [Инициализация и использование](#Инициализация-и-использование)
2. [Шаблонизатор EJS](#Шаблонизатор-EJS)

## Инициализация и использование

```javascript
// Initialization
const express= require('express')
const app = express()
app.listen(8080)
```

Метод `app.get` обработает GET-запрос и выдаст в методе `sendFile` указанный ресурс.

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

## Шаблонизатор EJS
[**EJS**](https://github.com/mde/ejs#readme) – *Embedded JavaScript templating*

### Установка
```bash
npm install ejs
```

### Использование

```javascript
const express = require('express')
const app = express()

// Server initialization
app.listen(8080)
// Указание базовой папки с шаблоном
app.set('views', __dirname)
// Установка движка EJS
app.set('view engine', 'ejs')

const names = {
  jake: 'admin',
  dwayne: 'manager',
  philip: 'user'
}

app.get('/user/:name', (request, response) => {
  let role
  if (request.params.name in names) {
    role = names[request.params.name]
  } else {
    role = '<i>guest</i>'
  }
  // Указание имени шаблона и передача параметров для подстановки
  response.render('user', {
    name: request.params.name,
    role: role
  })
  response.end()
})

// curl http://localhost:8080/user/william

```

### Файл шаблона

Чтобы предотвратить преобразование
спецсимволов в HTML-сущности
используется `<%- имя_переменной %>`

```html
<h3>Пользователь <%= name%></h3>
<p>известен как <%- role%></p>
```
