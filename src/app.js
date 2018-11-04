const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 8080

const pages = require('./pages')
const setters = require('./setters')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(pages)
app.use(setters)

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if(err) {
        return console.log('connection failed')
    }
    const db = client.db('9GAG');
    (global).User = db.collection('User');
    (global).Post = db.collection('User');
})

console.log('Up and running')

app.listen(PORT)