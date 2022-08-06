# Создание веб-сервера

```javascript
const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  })
  response.write('Привет от меня!')

  // Reading HTML-file asynchronously
  fs.readFile('index.html', (err, content) => {
    response.write(decodeURIComponent(content))
    response.end()
  })

  // or reading file synchronously
  const content = fs.readFileSync('index.html')
  response.write(decodeURIComponent(content))
  response.end()
}).listen(8080)
```