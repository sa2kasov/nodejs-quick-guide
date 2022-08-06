# Чтение файла
В Node.js по умолчанию методы отрабатываеют асинхронно, следует указывать явно когда мы хотим синхронную отработку кода.

```javascript
const fs = require("fs")
```
Синхронное чтение файла
```javascript
const content = fs.readFileSync('file.txt')
console.log(decodeURIComponent(content))
console.log('The End') // Runs after file reading
```

Асинхронное чтение файла
```javascript
fs.readFile('file.txt', (err, content) => {
  console.log(decodeURIComponent(content))
})
console.log('The End') // Runs before file reading
```
