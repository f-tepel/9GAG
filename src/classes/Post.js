export class Post {
    _id
    userId
    caption
    description
    image
    likes
    dislikes
    comments

    constructor(userId, caption, description, image){
        this.userId = userId
        this.caption = caption
        this.description = description
        this.image = image
        this.likes = []
        this.dislikes = []
        this.comments = []
    }
}