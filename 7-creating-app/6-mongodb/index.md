# MongoDB

[**MongoDB**](https://mongodb.com) – бессхемная документо-ориентированная NoSQL-система управления базами данных. Ссылка на [документацию](https://mongodb.com/docs).

### Установка

Установка драйвера mongoDB для Node.js через NPM:

```bash
npm install mongodb
```

MongoDB это целая система управления БД, которую нужно установить с [официального сайта](https://www.mongodb.com/try/download) под конкретную операционную систему. Дополнительные инструменты, такие как MongoDB Shell, MongoDB Compass и другие устанавливаются отдельно со [страницы инструментов MongoDB](https://www.mongodb.com/try/download/tools).

### Инструменты MongoDB

* [**MongoDB Shell**](https://www.mongodb.com/try/download/shell) (`mongosh`) – утилита командной строки для быстрого подключения и работы с MongoDB. Пришла на смену устаревшей командной оболочки `mongo` с версии MongoDB v5.0. Инструмент поставляется автономно (_standalone_) отдельно от сервера MongoDB, имеет открытый исходный код и [документацию](https://www.mongodb.com/docs/mongodb-shell/) на оф. сайте;
* [**MongoDB Compass**](https://www.mongodb.com/try/download/compass) – графический клиент MongoDB для исследования и управления базами данных. Предоставляет возможности по визуализации схем, показатели производительности, возможности запросов и другое;
* [**The MongoDB Database Tools**](https://www.mongodb.com/try/download/database-tools) – набор утилит командной строки для работы с развертыванием MongoDB (дамп базы, импорт/экспорт, конвертация и пр.). Поставляются отдельно вне зависимости от графика релизов основного сервера MongoDB. Соответствующая [документация по инструментам](https://www.mongodb.com/docs/database-tools/) на официальном сайте.

### Команды в MongoDB Shell (`mongosh`)

• Отобразить используемую базу данных. Команда возвращает `test`, если используется база данных по умолчанию.

    db

• Переключение между базами данных

    use <database>

• Показать доступные базы данных

    show dbs

• Создание новой базы `newDatabase` и коллекции (таблицы) `posts`. Если база уже существует, то система просто переключится на неё.

    use newDatabase
    db.posts.insertOne( { x: 1 } );

• Показать коллекции в текущей БД

    show collections

### Выполнение CRUD операций

CRUD операции это команды на создание, чтение, обновление, и удаления данных.

#### Создание (Create)

Операции Создания (Create) или Вставки добавляют один или несколько данных за одну операцию. Если коллекции `collection` не существует, она будет создана автоматически.

* Вставка одной записи `db.collection.insertOne()`
* Вставка нескольких `db.collection.insertMany()`

Пример:

    db.movies.insertOne({
        title: "Top Gun: Maverick",
        genres: [ "Action", "Drama" ],
        runtime: 130,
        year: 2022
    })

`insertOne()` возвращает документ, который включает значение поля `_id` только что вставленного документа.

Чтобы получить вставленный документ – Чтение (Read) коллекции

    db.movies.find( { title: "Top Gun: Maverick" } )

#### Чтение (Read)

Операция Чтения (Read) извлекает данные из коллекции, подпадающие под указанные условия выборки.

##### Метод для запроса данных коллекции `collection`

    db.collection.find()

Для запроса всех данных коллекции отправляется пустой запрос в качестве параметра методы `find()`

    db.movies.find()

то же, что и

```sql
SELECT * FROM movies
```

Для выборки определённых данных необходимо указать условие в формате `<поле>:<значение>`

    db.movies.find( { "title": "Titanic" } )

соотвествует SQL запросу

```sql
SELECT * FROM movies WHERE title = "Titanic"
```

##### Использование селекторов запроса в фильтре

    db.movies.find( { year: { $in: [2024, 2025 ] } } )

Аналогично SQL запросу

```sql
SELECT * FROM movies WHERE year in (2024, 2025)
```

##### Логические операторы `AND / OR`

    db.movies.find( { countries: "Canada", "imdb.rating": { $gte: 7 } } )

    db.movies.find( {
     year: 2026,
     $or: [ { "awards.wins": { $gte: 5 } }, { genres: "Drama" } ]
    } )

#### Обновление (Update)

Операция Обновление (Update) изменяет существующие данные в коллекции. Может затрагивать несколько данных за одну операцию, совпадающие под указанные условия и фильтры в запросе.

MongoDB Shell предоставляет следующие методы для обновления данных в коллекции:

* Обновить один документ `db.collection.updateOne()`
* Обновить несколько `db.collection.updateMany()`
* Заменить документ `db.collection.replaceOne()`

##### Обновление одного документа

    db.movies.updateOne( { title: "Old Name" }, {
        $set: { title: "New Name" }
        { $currentDate: { lastUpdated: true } }
    })

##### Обновление нескольких документов

    db.listingsAndReviews.updateMany({
        runtime: { $lt: 200 } },
        { $set: { type: "movie", countries: "Spaine" }
    })

##### Замена документа

Чтобы заменить все содержимое документа, кроме поля `_id` необходимо передать совершенно новый документ в качестве второго аргумента функции `db.collection.replaceOne()`. Замещающий документ может иметь поля, отличные от исходного документа.

    db.movies.replaceOne(
        { _id: 95 },
        { _id: 97, type: "TV Show", genres: [ "Fantasy", "Drama" ]
    })

#### Удаление (Delete)

Операция Удаления (Delete) удаляет один или несколько существующих документов в коллекции, соответствующие указанным условиям и фильтрам.

* удалить один документ `db.collection.deleteOne()`
* удалить несколько документов `db.collection.deleteMany()`

##### Удаление одного документа

    db.movies.deleteOne( { cast: "Brad Pitt" } )

##### Удаление нескольких документов

    db.movies.deleteMany( { title: "Titanic" } )

### Mongoose

Mongoose – библиотека JavaScript которая применяется для работы с базой данных MongoDB, определяет объекты со строго-типизированной схемой для данных отправляемые в базу, абстрагирует доступ и взаимодействие с MongoDB. Mongoose включает в себя встроенное приведение типов, проверку, построение запросов, перехватчики бизнес-логики и многое другое.

### Установка и подключение

```bash
npm install mongoose --save
```

Методы добавляются в свойства объекта `methods` в прототип модели, которые затем будут доступны во всех его экземплярах.

```javascript
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test');

// Creating a Schema
const Cars = new mongoose.Schema({
  model: String,
  serial: {
    type: Number,
    unique: true
  },
  body: {
    type: String,
    required: true
  },
  added: {
    type: Date,
    default: Date.now()
  }
},
  // Adding methods
{
  methods: {
    start() {
      console.info('Engine started...')
    }
  }
})

// Virtual types
Cars.virtual('name')
  .get(() => this.model)
  .set(name => this.model = name)
```

Компиляция схемы в модель

```javascript
const Car = mongoose.model('Car', Cars);

// Creating new object based on the Car schema
const tesla = new Car({
  model: 'Model X',
  body: 'sedan'
})
```

Модель это класс с помощью которого создаётся экземпляр документа со свойствами и поведением, указанные в схеме. Чтобы сохранить документ в базу вызывается метод сохранения `save`.

```javascript
tesla.save((error, obj, rows) => {
  if (error) {
    console.log(error)
  } else {
    console.log(obj)
  }
})
```