const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/user/register', (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let pwd = req.body.pwd;

    (global).User.findOne({
        email,
        pwd
    }, { _id: 1}, (err, docs) => {
        if(docs) {
            res.status(400).send('exists')
        } else {
            (global).User.insertOne({
                name,
                email,
                pwd
            })
            res.status(200).send('Added User')
        }
    })
})

router.post('/user/login', (req, res) => {
    let email = req.body.email
    let pwd = req.body.pwd;

    (global).User.findOne({
        email,
        pwd
    }, { _id: 1}, (err, docs) => {
        if(docs) {
            res.status(200).send('success')
        } else {
            res.status(404).send('not found')
        }
    })
})

module.exports = router