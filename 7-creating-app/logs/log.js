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
      new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
      }),
      new winston.transports.File({
        filename: __dirname + '/app.log'
      })
    ]
  })
}

module.exports = logger