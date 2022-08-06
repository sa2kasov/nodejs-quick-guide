const fs = require("fs")

// Reading the file synchronously
const content = fs.readFileSync('file.txt')
console.log('synchronously: ', decodeURIComponent(content))

// Reading the file asynchronously
fs.readFile('file.txt', (err, content) => {
  console.log('asynchronously: ', decodeURIComponent(content))
})

console.log('The End')
