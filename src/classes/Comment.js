const ObjectId = require('mongodb').ObjectID

class Comment {
    
    constructor(text, userId, author) {
        this.text = text
        this.userId =  userId
        this.date = new Date()
        this.author = author
    }

    insertComment(postId) {
        global.PostDB.update({
            _id: ObjectId(postId)
        }, {
            $push: {
                comments: this
            }
        })
    }
}

module.exports = Comment