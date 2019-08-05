const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const path = require('path')
const appRoot = require('app-root-path').toString()
const app = express()
const PORT = process.env.PORT || 8080

const pages = require('./pages')
const user = require('./routes/user')
const post = require('./routes/post')
const section = require('./routes/section')

app.use('/public', express.static(path.join(appRoot, '/public')))
app.use(bodyParser.urlencoded({ 
    extended: true,
    limit: '50mb'
}))
app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(pages)
app.use(user)
app.use(post)
app.use(section)

MongoClient.connect('mongodb://production:Start1234@ds145434.mlab.com:45434/heroku_3203nh34', function (err, client) {
    if(err) {
        return console.log('connection failed')
    }
    const db = client.db('heroku_3203nh34');
    global.UserDB = db.collection('UserDB');
    global.PostDB = db.collection('PostDB');
    global.SectionDB = db.collection('SectionDB');
})

console.log('Up and running')

app.listen(PORT)