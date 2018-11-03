const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.post('/user', (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let pwd = req.body.pwd
    console.log(name + ' | ' + email + ' | ' + pwd)
})