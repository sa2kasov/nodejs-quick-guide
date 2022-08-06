const http = require('http')
const app = http.createServer()
app.listen(8080)

app.on('connection', () => {
  console.log('Connection has been established')
})

app.on('listening', (request, response) => {
  console.log('Listening the post 8080...')
})

app.on('request', (request, response) => {
  console.log('Request of ', request.url)
  console.log('Method: ', request.method)
  console.log('Status Code: ', response.statusCode)
  response.writeHead(200)
  response.write('Hello, World!')
  response.end()
})

app.on('close', () => {
  console.log('Server closed')
})
