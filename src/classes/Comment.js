const ObjectId = require('mongodb').ObjectID

class Comment {
    
    constructor(text, userId) {
        this.text = text
        this.userId =  userId
        this.date = new Date()
        //this.getAuthor(userId)
    }

    getAuthor(id) {
        global.UserDB.findOne({
            _id: ObjectId(id)
        }, (err, user) => {
            this.author = user.email
        })
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