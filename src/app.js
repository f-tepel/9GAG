const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

const pages = require('./pages')
app.use(pages)

console.log('Up and running')

app.listen(PORT)