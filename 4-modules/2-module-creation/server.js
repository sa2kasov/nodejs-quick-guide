require('http').createServer((request, response) => {
  response.writeHead(200)

  request.on('data', data => {
    console.log('Request: ' + data.toString())
    response.write('Write: ' + data.toString())
  })

  request.on('end', () => {
    console.log('Request end')
    response.end()
  })
}).listen(8080)
