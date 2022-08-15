const url = require('url')
const express = require('express')
const req = require('request')
const app = express()

app.listen(8080)
app.set('views', __dirname)
app.set('view engine', 'ejs')

app.get('/posts/:userId', (request, response) => {
  const userId = request.params.userId
  const options = {
    protocol: 'https',
    host: 'jsonplaceholder.typicode.com',
    pathname: '/posts',
    query: {
      userId: userId,
    }
  }
  const uri = url.format(options)
  req(uri, (err, res, body) => {
    const posts = JSON.parse(body)
    response.render('posts', {posts, userId})
  })
})