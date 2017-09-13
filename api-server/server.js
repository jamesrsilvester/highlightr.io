const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = process.env.API_PORT || 8080

const db = require('./models')
const controllers = require('./controllers')

// use body-parser middleware to populate req.body
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// TODO: document API
app.get('/api', (req, res) => res.send('Hello, world!'))

app.get('/api/users', controllers.user.index) // for testing only!
app.post('/api/users', controllers.user.create)
app.get('/api/users/:user_id', controllers.user.show)
app.patch('/api/users/:user_id', controllers.user.update)
app.delete('/api/users/:user_id', controllers.user.destroy)

app.get('/api/articles', controllers.article.index) // for testing only!
app.post('/api/articles', controllers.article.create)
app.get('/api/articles/:slug', controllers.article.show)
app.patch('/api/articles/:slug', controllers.article.update)
app.delete('/api/articles/:slug', controllers.article.destroy)

app.listen(port, () => console.log(`API Server running on port http://localhost:${port}.`))
