const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const path = require('path')
const appRoot = require('app-root-path').toString()
const app = express()
const PORT = process.env.PORT || 8080

const pages = require('./pages')
const login = require('./routes/user/login')
const register = require('./routes/user/register')

app.use('/public', express.static(path.join(appRoot, '/public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(pages)
app.use(login)
app.use(register)

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if(err) {
        return console.log('connection failed')
    }
    const db = client.db('9GAG');
    (global).User = db.collection('User');
    (global).Post = db.collection('Post');
})

console.log('Up and running')

app.listen(PORT)