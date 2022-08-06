// Including HTTP-server module
const http = require('http')
const app = http.createServer((request, response) => {
  response.writeHead(200)
  response.write('Hello, World!')
  response.end()
})
app.listen(8080)
