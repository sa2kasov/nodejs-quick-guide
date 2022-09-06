# Логирование

[**winston**](https://github.com/winstonjs/winston#readme) – простая и универсальная библиотека логгирования. Поддерживает несколько способов организации хранения логов: в консоль, в файл или в свой настраеваемый способ, например, в базу данных.

### Установка

```bash
npm install winston
```

### Инициализация

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

### Использование

```javascript
const log = require('./path-to/logger')(module)

log.info('Hello, World! It is winston!')

log.log({
  level: 'info',
  message: 'Another log entry from me'
});
```