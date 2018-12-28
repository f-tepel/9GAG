class Post {
    constructor(userId, section, caption, description, image){
        this.userId = userId
        this.date = new Date()
        this.section = section
        this.caption = caption
        this.description = description
        this.image = image
        this.likes = []
        this.dislikes = []
        this.comments = []
    }

    static getPostByUser(user, callback) {
        global.PostDB.find({
            userId: user._id
        }).toArray((err, post) => {
            callback(user, post)
        })
    }
}

module.exports =  Post