const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const path = require('path')
const appRoot = require('app-root-path').toString()
const app = express()
const PORT = process.env.PORT || 8080

const pages = require('./pages')
const login = require('./routes/user/login')
const deleteUser = require('./routes/user/delete')
const register = require('./routes/user/register')
const profile = require('./routes/user/profile')
const post = require('./routes/post')

app.use('/public', express.static(path.join(appRoot, '/public')))
app.use(bodyParser.urlencoded({ 
    extended: true,
    limit: '50mb'
}))
app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(pages)
app.use(login)
app.use(register)
app.use(deleteUser)
app.use(profile)
app.use(post)

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if(err) {
        return console.log('connection failed')
    }
    const db = client.db('9GAG');
    global.User = db.collection('User');
    (global).Post = db.collection('Post');
})

console.log('Up and running')

app.listen(PORT)