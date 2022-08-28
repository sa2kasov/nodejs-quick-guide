<p align="center">
    <img
      alt="Node.js Logo"
      src="https://nodejs.org/static/images/logo-light.svg"
      width="400"
    />
</p>

# Node.js Quick Guide

Node.js is an open source, cross-platform runtime environment for developing server-side and networking applications. The platform built on Google Chrome's JavaScript Engine (V8 Engine). Node.js applications are written in JavaScript, and can be run within the Node.js runtime on Windows, Linux, and OS X.

## Table of Contents
1. [Node.js Basics](./1-basics/index.md)
    1. [What is Node.js](./1-basics/1-what-is-nodejs/index.md)
    2. [Environment Setup](./1-basics/2-environment-setup/index.md)
    3. [V8 JavaScript Engine](./1-basics/3-v8-javascript-engine/index.md)
    4. [Blocking vs Non-Blocking](./1-basics/4-blocking-vs-non-blocking/index.md)
    5. [File Reading](./1-basics/5-file-reading/index.md)
    6. [Web-server Creating](./1-basics/6-web-server-creating/index.md)
    7. [Web-server Using](./1-basics/7-web-server-using/index.md)
2. [Events](./2-events/index.md)
3. [Streams](./3-streams/index.md)
   1. [curl](./3-streams/index.md#curl)
   2. [POST method & Request Processing](./3-streams/index.md#HTTP-метод-POST-и-способы-обработки-запроса)
   3. [File Reading & Writing](./3-streams/index.md#Чтение-из-файла-и-запись-в-файл)
   4. [File Uploading](./3-streams/index.md#Загрузка-файла-на-сервер)
4. [Modules](./4-modules/index.md)
   1. [Basics of Modules](./4-modules/index.md#Принцип-создания-модулей)
   2. [Creation & Export](./4-modules/index.md#Создание-и-экспортирование-модулей)
   3. [Import & Execution](./4-modules/index.md#Импорт-модулей-и-выполнение)
   4. [Where Node.js searches for modules](./4-modules/index.md#Где-Node.js-ищет-модули?!)
5. [Express](./5-express/index.md)
   1. [Express Usage](./5-express/index.md#Инициализация-и-использование)
   2. [EJS Template Engine](./5-express/index.md#Шаблонизатор-EJS)
6. [WebSockets](./6-websockets/index.md)
   1. [Socket.io](./6-websockets/index.md#Socket.io)
   2. [PUG Template Engine](./6-websockets/index.md#Pug-–-HTML-шаблонизатор)
7. [Creating an App](./7-creating-app/index.md)
   1. [Express application generator (express-generator)](./7-creating-app/index.md#Создание-каркаса-приложения)
   2. [Middleware](./7-creating-app/index.md#Middleware)
   3. [App Configuration (nconf)](./7-creating-app/index.md#Конфигурация-приложения)
   4. [Logging (winston)](./7-creating-app/index.md#Логирование)
   5. [Using Template Engine (ejs-locals)](./7-creating-app/index.md#Шаблонизация-с-EJS)
   6. [MongoDB](./7-creating-app/index.md#MongoDB)
