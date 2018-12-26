const express = require('express')
const router = express.Router()
const Section = require('../classes/Section')
const bodyParser = require('body-parser')

router.get('/api/section/all', (req, res) => {
    global.SectionDB.find({}).toArray((err, sections) => {
        if(err) return res.status(404).send()
        return res.send(sections)
    })
})

router.post('/api/section', (req, res) => {
    let section = new Section(req.body.name)
    global.SectionDB.insert(section)
    res.send()
})

module.exports = router