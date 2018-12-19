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

//get Landingpage
fs.readFile('views/landingpage.html', (err, html) => {
    router.get('/', (req, res) => {
        res.send(html.toString())
    })
})

//get Landingpage
fs.readFile('views/profile.html', (err, html) => {
    router.get('/profile', (req, res) => {
        res.send(html.toString())
    })
})

//get actions
fs.readFile('views/actions.html', (err, html) => {
    router.get('/actions', (req, res) => {
        res.send(html.toString())
    })
})

//get upload
fs.readFile('views/upload.html', (err, html) => {
    router.get('/upload', (req, res) => {
        res.send(html.toString())
    })
})

module.exports = router
