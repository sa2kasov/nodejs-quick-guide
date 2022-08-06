const events = require('events')
const Emitter = events.EventEmitter
const event = new Emitter

event.on('foo', ...params => console.log(params))

event.emit('foo', 'param1')

// Передача нескольких аргументов
event.emit('foo')
