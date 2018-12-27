const ObjectId = require('mongodb').ObjectID

class Like {
    constructor(userId, postId) {
        this.userId = userId
        this.postId = postId
    }

    insertLike() {
        global.PostDB.update({
            _id: ObjectId(this.userId)
        },
        {
            $push: {
                likes: this
            }
        })
    }

    insertDislike() {
        global.PostDB.update({
            _id: ObjectId(this.userId)
        },
        {
            $push: {
                dislikes: this
            }
        })
    }
}

module.exports = Like