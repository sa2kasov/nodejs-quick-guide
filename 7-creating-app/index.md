# Создание веб-приложения на Node.js

## Создание каркаса приложения

[**Генератор приложений Express**](https://expressjs.com/ru/starter/generator.html) – инструмент командной строки, используется для быстрого создания скелета приложеня Node/Express. Запуск генератора с помощью команды `npx`:

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

## Логирование

[**winston**](https://github.com/winstonjs/winston#readme) – простая и универсальная библиотека логгирования. Поддерживает несколько способов организации хранения логов: в консоль, в файл или в свой настраеваемый способ, например, в базу данных.

#### Установка

```bash
npm install winston
```

#### Инициализация

```javascript
// logger.js
const winston = require('winston')

function logger(module) {
  return winston.createLogger({
    format: winston.format.combine(
        winston.format.label({label: module.filename}),
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({stack: true}),
        winston.format.splat(),
        winston.format.json()
    ),
    transports: [
      // Export to Console
      new winston.transports.Console({
        format: winston.format.combine(
            // Цветной вывод в консоли
            winston.format.colorize(),
            winston.format.simple()
        )
      }),
      // Export to File
      new winston.transports.File({
        filename: __dirname + '/app.log'
      })
    ]
  })
}

module.exports = logger
```

#### Использование

```javascript
const log = require('./path-to/logger')(module)

log.info('Hello, World! It is winston!')

log.log({
  level: 'info',
  message: 'Another log entry from me'
});
```

## Шаблонизация с EJS

Обычный шаблонизатор EJS к сожалению не поддерживает вложенные шаблоны. Модуль `ejs-locals` имеет те же возможности что и `ejs` с добавлением таких функциональностей как `layout`, `block`, `partial`.

#### Установка

```bash
npm install ejs-locals --save
```

#### Инициализация

```javascript
app.engine('ejs', require('ejs-locals'))
```

Создадим файл `main.ejs` с базовым содержимым, который затем применим в индексном файле `index.ejs`.

```ejs
<!-- main.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body>
<h1><%= title %></h1>
<%- body %>
</body>
</html>
```

##### • `layout`

В файле `index.ejs` подключается шаблон `main.ejs` с помощью `layout`, а дальнейшее содержимое вставляется вместо `<%- body %>` подключаемого шаблона. Таким образом, `layout` используется для подключения повторяющего шаблона на многих страницах с одинаковым оформлением.

```ejs
<!-- index.js -->
<% layout('main') %>
<p>Welcome to <%= title %></p>
```

##### • `block(name, html)`

Именованный блок HTML-кода задаётся в любом месте шаблона.

```ejs
<% block('header', 'Hello, this is block.header content') %>
```

Затем в макете можно выполнить `<%=blocks.name%>` или `<%-block('name')%>`, где `name` это именнованный блок куда мы постестили код как в переменную.

```ejs
<%= blocks.header %>
```

##### • `script(src, type)` и `stylesheet(href, media)`

При вызове в любом месте шаблона добавляет тег `<script>` с заданным `src`/`type` в блок `scripts`. Затем в макете можно выполнить `<%-scripts%>`, чтобы вывести скрипты из всех дочерних шаблонов.

Аналогично и с тегами `<link>` для css-стилей. 

```ejs
<!-- Инициализация скриптов и стилей в одном шаблоне -->
block('scripts', '<script src="script.js"></script>')
block('stylesheets', '<link rel="stylesheet" href="href.css">')

<!-- Подключение скриптов и стилей в другом шаблоне -->
<%-scripts%>
<%-stylesheets%>
```

##### • `partial(name, optionsOrCollection)`

Функция `partial` добавляет в любом месте макета указанный шаблон с именем `name`, в этот шаблон передаётся текуще указанная коллекция данных (массив) `optionsOrCollection`. В шаблоне она будет доступна под таким же именем `name`. 

###### • `include path/view`

Функция `include` поддерживаеся в оригинальном EJS.

```ejs
<% include путь/имя-шаблона %>
```

