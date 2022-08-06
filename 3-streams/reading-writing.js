const fs = require('fs')

// Создаём дескриптор файлового потока для чтения
const file = fs.createReadStream('file.txt')

// Создаём дескриптор файлового потока для записи
const newFile = fs.createWriteStream('new-file.txt')

file.pipe(newFile)
