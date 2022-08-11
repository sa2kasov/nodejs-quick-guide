const fs = require('fs')

// Initializing web server
require('http').createServer(server).listen(8080)

function server(request, response) {
  const newFile = fs.createWriteStream('new-file-3.txt')
  response.writeHead(200)
  request.pipe(newFile)
  request.on('data', chunk => {
    // chunk = '\r\nNew: ' + chunk
    // newFile.write(chunk)

    // buffer === true до тех пор, пока буфер не переполнен
    const buffer = newFile.write(chunk)
    if (!buffer) {
      request.pause()
    }
  })

  // При освобождении буфера
  newFile.on('drain', () => {
    console.log('Overloaded...')
    request.resume()
  })

  request.on('end', () => response.end('Uploaded!'))
}
