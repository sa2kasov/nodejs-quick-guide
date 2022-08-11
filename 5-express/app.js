const express = require('express')
const app = express()

// Initialization
app.listen(8080)

// Get queries processing
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/test.html')
})