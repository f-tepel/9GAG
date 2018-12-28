const authenticate = require( '../middleware/authenticate');
const express = require('express')
const router = express.Router()
const Section = require('../classes/Section')
const bodyParser = require('body-parser')

router.get('/api/section/all', authenticate, (req, res) => {
    global.SectionDB.find({}).toArray((err, sections) => {
        if(err) return res.status(404).send()
        return res.send(sections)
    })
})

router.post('/api/section/:id', authenticate, (req, res) => {
    let section = new Section(req.body.name)
    global.SectionDB.insert(section)
    res.send()
})

router.get('/api/section/post/:name', authenticate, (req, res) => {
    let name = req.params.name
    Section.getPostBySection(name, (posts) => {
        res.send(posts)
    })
})

module.exports = router