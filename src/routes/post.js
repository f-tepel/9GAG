const express = require('express')
const router = express.Router()
const Post = require('../classes/Post')
const ObjectId = require('mongodb').ObjectID

router.post('/api/post', (req, res) => {
    let caption = req.body.caption
    let section = req.body.section
    let post = new Post(ObjectId("5be5753c21aab22434a6fa97"), section, caption, 'desc', req.body.image);
    (global).Post.insert(post)
    res.status(200).send('Added post successfully')
})

router.delete('/api/post', (req, res) => {
    let id = req.body.id;
    (global).Post.findOne({
        _id: id
    }, {_id: 1}, (err, docs) => {
        console.log('id >>> ' + docs)
        if(err) {
            res.send(404).send('Post not found')
        }
        global.Post.deleteOne({
            _id: id
        })
        res.status(200).send('user deleted successfully')
    })
})

router.get('/api/post/all', (req, res) => {
    (global).Post.find({}).toArray((err, docs) => {
        if(err) return res.status(404).send(err)
        return res.send(docs)
    })
})

module.exports = router