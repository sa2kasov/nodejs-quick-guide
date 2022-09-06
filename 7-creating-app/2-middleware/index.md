# Middleware

Middleware – это промежуточная обработка данных, функция которая выполняет определённый фрагмент кода, имея доступ к объекту запроса `request`, объекту ответа `response` и передающая ход выполнения следующей функции промежуточной обработки `next`.

Чтобы выполнение передалось следующему Middleware (`app.use`) надо в текущем вызвать `next()`. В случае если `next(new Error())` передаёт ошибку, то следующий `app.use` должен принимать уже 4 параметра, первый из которых параметр `error`, он будет содержать объект переданной ошибки.

```javascript
app.use((request, response, next) => {
  // do something
  next() // Перейти к следующему app.use
})

app.use((request, response, next) => {
  app.send('Response sent')
  if(request.url !== '/something') {
    next(new Error('wrong-url'))
  }
})

app.use((error, response, request, next) => {
  if (error.message === 'wrong-url') {
    // Обрабатываем свою ошибку
    response.end('Not Found')
  } else {
    // Прокидываем ошибку дальше внутреннему обработчику
    next(error)
  }
})

express.errorHandler()
```