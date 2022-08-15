const express = require('express')
const app = express()

// Server initialization
app.listen(8080)
app.set('views', __dirname) // Базовая папка
app.set('view engine', 'ejs') // Указание расширения

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
  // Указание имени шаблона и передаваемые параметры
  response.render('user', {
    name: request.params.name,
    role: role
  })
  response.end()
})

// curl http://localhost:8080/user/william
