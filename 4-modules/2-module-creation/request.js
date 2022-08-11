const http = require('http')

function request(msg) {
  const options = {
    host: 'localhost',
    port: 8080,
    path: '/',
    method: 'POST'
  }

  console.log('Request start...')

  const run = http.request(options, response => {
    console.log('Response start...')
    response.on('data', data => console.log(data.toString()))
  })

  run.write(msg)
  run.end()
}

// client('Hello, World!')
module.exports = request
