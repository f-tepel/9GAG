const express = require('express')
const fs = require('fs')
const router = express.Router()

//get Login page
fs.readFile('views/login.html', (err, html) => {
    router.get('/login', (req, res) => {
        res.send(html.toString())
    })
})

//get Register page
fs.readFile('views/register.html', (err, html) => {
    router.get('/register', (req, res) => {
        res.send(html.toString())
    })
})

//get Dashboard page
fs.readFile('views/dashboard.html', (err, html) => {
    router.get('/dashboard', (req, res) => {
        res.send(html.toString())
    })
})

module.exports = router
