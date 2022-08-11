const url = require('url')
require('http').createServer((request, response) => {
  let data = ''
  const input = url.parse(request.url)

  if(input.query) {
    const q = input.query.split('=')
    switch(q[1].toLowerCase()) {
      case 'john':
        data = '[{"name": "John Doe", "age": 29, "role": "admin"}]'
        break
      case 'jane':
        data = '[{"name": "Jane Doe", "age": 24, "role": "user"}]'
        break
      default:
        data = '[{"name": "Unknown", "age": 0, "role": "guest"}]'
    }
  }

  response.writeHead(200, {'Content-Type': 'text/json'})
  response.write(data.toString())
  response.end()
}).listen(8081)

// curl http://localhost:8081?name=jane
