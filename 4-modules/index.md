# Modules

### Contents

1. [Принцип создания модулей](#Принцип-создания-модулей)
2. [Создание и экспортирование модулей](#Создание-и-экспортирование-модулей)
3. [Импорт модулей и выполнение](#Импорт-модулей-и-выполнение)
4. [Где Node.js ищет модули?!](#Где-Node.js-ищет-модули?!)

## Принцип создания модулей

```javascript
// module-1.js – Экспорт анонимной функции
module.exports = function(){}
// Подключение модуля
const x = require('./module-1')
// Использование
x();

// module-2.js – Экспорт как свойство объекта
exports.test = function(){}
// Импорт модуля
const x = require('./module-2')
// Вызов и использование
x.test()
require(‘./module-2’).test()
```

## Создание и экспортирование модулей

Создадим 3 модуля, которые затем импортируем и выполним в одном файле. Код файла первого модуля экспортирует функцию по её имени (именованный экспорт):
```javascript
// say-hello.js
const hello = function() {
  console.log('Hello')
}
module.exports = hello
```

Во втором моудле функция будет экспортирована как свойство `world` объекта.
```javascript
// say-world.js
exports.world = function() {
  console.log('world')
}
```

JSON-файл также может быть экспортирован как модуль Node.js.
```javascript
// data.json
{
  "mean": "Mongo, Express, Angular, Node.js",
  "mern": "Mongo, Express, React, Node.js",
  "mevn": "Mongo, Express, Vue, Node.js"
}
```
## Импорт модулей и выполнение
Сначала Node.js ищет файл по его имени с расширением .js, если не находит, то поиск ведёт по расширегию .json. Если и в этот раз поиск безуспешен, то ищется директория с таким названием, а в ней файл index.js

```javascript
// Export the function itself
const hello = require('./say-hello')

// Export as an object property
const world = require('./say-world')

// Exporting json file
const stacks = require('./data.json')

hello()
world.world()
console.log(stacks.mern)
```

## Где Node.js ищет модули?!

Путь локальных модулей начинается с `./`. Подключение модуля лишь с указанием его названия предполагает его расположение в папке `node_modules`. Если дирректории `node_modules` не было найдено в текущей папке, то её поиск продолжится в родительской папке и т.д. 

```javascript
require('./module')
require('../module')
require('/a/b/c/module')

require('module-name')
C:\parent-folder\folder\subfolder\node_modules
C:\parent-folder\folder\node_modules
C:\parent-folder\node_modules
C:\node_modules
```
