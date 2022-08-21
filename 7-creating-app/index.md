# Создание веб-приложения на Node.js

## Создание каркаса приложения

**Генератор приложений Express** используется быстрого создания скелета приложеня Express. Запуск генератора с помощью команды `npx`:

```javascript
// Установит скелет в пустую папку проекта
npx express-generator

// Для проверки доступных ключей
npx express-generator -h
```

После установки генератором скрипт предложит установить необходимые зависимости.

```bash
npm install
```

После установки зависимостей приложение будет готово к запуску.

```bash
node app.js
```

## Middleware

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

## Конфигурация приложения

Хранение входных данных настроек приложения можно вынести в отдельный файл. Модуль [nconf](https://www.npmjs.com/package/nconf) простое хранилище ключей и значений, где ключи разделены пространством имен и символом `:`.

#### Установка

```bash
npm install nconf
```

#### Инициализация

Настройки `nconf` устнавливаются в следующем порядке:

1. Аргументы командной строки
2. Переменные окружения Node.js (env)
3. Файл настроек по указанному пути ('path/to/config.json')

Проинициализиовать модуль можно в отдельном файле, а подключать его в тех местах, где он нужен.  

```javascript
// config/index.js
const nconf = require('nconf')
// Путь к конфигурационному файлу
nconf.argv().env().file({file: './config/config.json'})

module.exports = nconf
```

Файл настроек `config.json` может быть выглядеть так:

```json
{
  "port": 3000,
  "domain": "localhost",
  "log-level": "dev",
  "app-views": "views",
  "app-engine": "pug",
  "app-static": "public" 
}
```

#### Использование

В переменную `conf` импортируется модуль `index.js` описанный выше.

```javascript
const conf = require('./config')

app.set('views', path.join(__dirname, conf.get('app-views')));
app.set('view engine', conf.get('app-engine'));

app.use(logger(conf.get('log-level')));
app.use(express.static(path.join(__dirname, conf.get('app-static'))));
```
