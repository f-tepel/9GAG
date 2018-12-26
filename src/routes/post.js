const express = require('express')
const router = express.Router()
const Post = require('../classes/Post')
const Like = require('../classes/Like')
const ObjectId = require('mongodb').ObjectID

router.post('/api/post', (req, res) => {
    let caption = req.body.caption
    let section = req.body.section
    let post = new Post(ObjectId("5be5753c21aab22434a6fa97"), section, caption, 'desc', req.body.image);
    global.PostDB.insert(post)
    res.status(200).send('Added post successfully')
})

router.delete('/api/post', (req, res) => {
    let id = req.body.id;
    global.PostDB.findOne({
        _id: id
    }, {_id: 1}, (err, docs) => {
        if(err) {
            res.send(404).send('Post not found')
        }
        global.PostDB.deleteOne({
            _id: id
        })
        res.status(200).send('user deleted successfully')
    })
})

router.get('/api/post/all', (req, res) => {
    global.PostDB.find({}).toArray((err, docs) => {
        if(err) return res.status(404).send(err)
        return res.send(docs)
    })
})

router.get('/api/like/:id', (req, res) => {
    let id = req.params.id
    let like = new Like(id, true)
    like.insertLike()
    res.send('success')
})

router.get('/api/dislike/:id', (req, res) => {
    let id = req.params.id
    let like = new Like(id, true)
    like.insertDislike()
    res.send('success')
})

module.exports = router