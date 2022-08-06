const http = require('http')
  .createServer()
  .listen(8080)

http.on('request', (request, response) => {
  response.writeHead(200)
  response.write('Start...')

  /*request.on('data', (msg) => {
    // console.log(msg.toString())
    process.stdout.write(msg.toString())
  })

  request.on('end', (msg) => {
    // Метод end() выведет аргумент перед завершением ответа
    response.end('End...')
  })*/

  request.pipe(response)
})
