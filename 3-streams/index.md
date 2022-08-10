# Streams

Потоки в Node.js это абстрактный интерфейс, который релизуется многими объектами для непрерывного считывания или записывания данных.

4 типа потоков Node.js:
* Readable — поток, который используется для операции чтения;
* Writable — поток, который используется для записи;
* Duplex — поток, который может использоваться как для чтения, так и для записи;
* Transform — тип дуплексного потока, в котором вывод вычисляется на основе вводимых данных.


## curl
`culr` – утилита командной строки для передачи данных с сервера и на сервер.

Простая отправка запроса методом GET

```javascript
curl [URL]
```

Отправка POST-данных:
```javascript
// Отправка данных методом POST
curl -d 'данные' [URL]

// URL-кодирование данных при отправке
curl --data-urlencode 'данные' [URL]

// Отправка данных формы
curl --form field=value [URL]
curl --form field=@filename [URL]
curl --upload-file filename [URL]

// HTTP-заголовки
curl --referer [URL]
curl --user-agent 'name-of-user-agent' [URL]
curl --cookie 'name=value' [URL]
```

## HTTP-метод POST и способы обработки запроса

`console.log()` в Node.js является обёрткой метода `process.stdout.write()`

```javascript
process.stdout.write()
// то же, что и
console.log()
```

```javascript
request.on('data', data => {
  process.stdout.write(data.toString())
})

request.on('end', () => {
  response.end('End...')
})
```

Создание эхо-сервера (моментально отдать то, что получили)

```javascript
request.pipe(response)
```

## Чтение из файла и запись в файл

```javascript
const fs = require('fs')

// Создаём дескриптор файлового потока для чтения
const file = fs.createReadStream('file.txt')

// Создаём дескриптор файлового потока для записи
const newFile = fs.createWriteStream('new-file.txt')

file.pipe(newFile)
```

## Загрузка файла на сервер

```javascript
const fs = require('fs')

// Initializing web server
require('http').createServer(server).listen(8080)

function server(request, response) {
  const newFile = fs.createWriteStream('new-file-2.txt')
  response.writeHead(200)
  
  // Upload the whole file into the new one
  request.pipe(newFile)
  
  // Add some data in the beginning on POST
  request.on('data', chunk => {
    chunk = '\r\nNew: ' + chunk
    newFile.write(chunk)
  })
  request.on('end', () => response.end('Uploaded!'))
}
```

Загрузим файл посредством `curl`
```bash
curl --upload-file file.txt http://localhost:8080
```

Операция запись всегда медленнее чтения. При зачитывания файла данные сохраняются в буфере обмена из которого затем считывается. Если файл очень большой, то во избежании переполнения буфера мы можем приостанавливать чтение и возобновлять его как только буфер обмена освободится.

```javascript
const fs = require('fs')

// Initializing web server
require('http').createServer(server).listen(8080)

function server(request, response) {
  const newFile = fs.createWriteStream('new-file-3.txt')
  response.writeHead(200)
  request.pipe(newFile)
  request.on('data', chunk => {
    // buffer === true до тех пор, пока буфер не переполнен
    const buffer = newFile.write(chunk)
    if (!buffer) {
      request.pause()
    }
  })

  // При освобождении буфера
  newFile.on('drain', () => {
    console.log('The buffer is free again')
    request.resume()
  })

  request.on('end', () => response.end('Uploaded!'))
}
```