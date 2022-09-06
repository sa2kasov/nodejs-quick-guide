# Конфигурация приложения

Хранение входных данных настроек приложения можно вынести в отдельный файл. Модуль [nconf](https://www.npmjs.com/package/nconf) простое хранилище ключей и значений, где ключи разделены пространством имен и символом `:`.

### Установка

```bash
npm install nconf
```

### Инициализация

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

### Использование

В переменную `conf` импортируется модуль `index.js` описанный выше.

```javascript
const conf = require('./config')

app.set('views', path.join(__dirname, conf.get('app-views')));
app.set('view engine', conf.get('app-engine'));

app.use(logger(conf.get('log-level')));
app.use(express.static(path.join(__dirname, conf.get('app-static'))));
```