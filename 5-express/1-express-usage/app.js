const express = require('express')
const app = express()

// Server initialization
app.listen(8080)

// Output simple HTML for a GET query
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

/**
 * GET queries processing
 * */
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
    role = 'guest'
  }
  response.write(role)
  response.end()
})

// curl http://localhost:8080/user/william
