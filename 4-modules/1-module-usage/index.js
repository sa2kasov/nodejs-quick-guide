// Export the function itself
const hello = require('./say-hello')

// Export as an object property
const world = require('./say-world')

// Exporting json file
const stacks = require('./data.json')

/**
 * Сначала Node.js ищет файл по его имени с расширением .js, если не находит, то поиск ведёт по расширегию .json. Если и в этот раз поиск безуспешен, то ищется директория с таким названием, а в ней файл index.js
 * */

hello()
world.world()
console.log(stacks.mern)
