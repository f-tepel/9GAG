export class Comment {
    _id
    text
    date
    userId

    constructor(text, userId) {
        this.text = text
        this.userId =  userId
        this.date = new Date()
    }
}