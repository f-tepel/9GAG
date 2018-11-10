const express = require('express')
const router = express.Router()

router.delete('/post', (req, res) => {
    let id = req.body.id;
    (global).Post.findOne({
        _id: id
    }, {_id: 1}, (err, docs) => {
        console.log('id >>> ' + docs)
        if(err) {
            res.send(404).send('Post not found')
        }
        (global).Post.deleteOne({
            _id: id
        })
        res.status(200).send('user deleted successfully')
    })
})

module.exports = router