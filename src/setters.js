const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/user', (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let pwd = req.body.pwd
    console.log(name + ' | ' + email + ' | ' + pwd);
    (global).User.insert({
        name,
        email,
        pwd
    })
    res.status(200).send('Added User')
})

module.exports = router