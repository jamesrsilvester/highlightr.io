const express = require('express')
const app = express()

const port = process.env.API_PORT || 8080

const db = require('./models')
const controllers = require('./controllers')

app.get('/', (req, res) => res.send('Hello, world!'))

app.get('/api/users', controllers.user.get) // for testing only!
app.post('/api/users', controllers.user.post)

app.listen(port, () => console.log(`API Server running on port http://localhost:${port}.`))
