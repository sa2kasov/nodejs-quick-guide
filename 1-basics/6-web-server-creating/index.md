# Создание веб-сервера
Node.js при получение запроса от клиента сам обрабатывает его и разбивает на HTTP-заголовки и тело запроса.

```javascript
const http = require('http')
const app = http.createServer((request, response) => {
  response.writeHead(200)
  response.write('Hello, World!')
  response.end()
})
app.listen(8080)
```

При наборе в браузере `htpp://localhost:8080` будет доступен наш сервер.