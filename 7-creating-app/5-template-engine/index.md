# Шаблонизация с EJS

Обычный шаблонизатор [**EJS**](https://github.com/mde/ejs#readme) к сожалению не поддерживает вложенные шаблоны. Модуль [**ejs-locals**](https://github.com/randometc/ejs-locals#readme) имеет те же возможности что и `ejs` с добавлением таких функциональностей как `layout`, `block`, `partial`.

### Установка

```bash
npm install ejs-locals --save
```

### Инициализация

```javascript
app.engine('ejs', require('ejs-locals'))
```

Создадим файл `main.ejs` с базовым содержимым, который затем применим в индексном файле `index.ejs`.

```ejs
<!-- main.ejs -->
<!DOCTYPE html>
<html>
<head>
    <title><%= title %></title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body>
<h1><%= title %></h1>
<%- body %>
</body>
</html>
```

#### • `layout`

В файле `index.ejs` подключается шаблон `main.ejs` с помощью `layout`, а дальнейшее содержимое вставляется вместо `<%- body %>` подключаемого шаблона. Таким образом, `layout` используется для подключения повторяющего шаблона на многих страницах с одинаковым оформлением.

```ejs
<!-- index.js -->
<% layout('main') %>
<p>Welcome to <%= title %></p>
```

#### • `block(name, html)`

Именованный блок HTML-кода задаётся в любом месте шаблона.

```ejs
<% block('header', 'Hello, this is block.header content') %>
```

Затем в макете можно выполнить `<%=blocks.name%>` или `<%-block('name')%>`, где `name` это именнованный блок куда мы постестили код как в переменную.

```ejs
<%= blocks.header %>
```

#### • `script(src, type)` и `stylesheet(href, media)`

При вызове в любом месте шаблона добавляет тег `<script>` с заданным `src`/`type` в блок `scripts`. Затем в макете можно выполнить `<%-scripts%>`, чтобы вывести скрипты из всех дочерних шаблонов.

Аналогично и с тегами `<link>` для css-стилей.

```ejs
<!-- Инициализация скриптов и стилей в одном шаблоне -->
block('scripts', '<script src="script.js"></script>')
block('stylesheets', '<link rel="stylesheet" href="href.css">')

<!-- Подключение скриптов и стилей в другом шаблоне -->
<%-scripts%>
<%-stylesheets%>
```

#### • `partial(name, optionsOrCollection)`

Функция `partial` добавляет в любом месте макета указанный шаблон с именем `name`, в этот шаблон передаётся текуще указанная коллекция данных (массив) `optionsOrCollection`. В шаблоне она будет доступна под таким же именем `name`.

##### • `include path/view`

Функция `include` поддерживаеся в оригинальном EJS.

```ejs
<% include путь/имя-шаблона %>
```