const ObjectId = require('mongodb').ObjectID

class Section {
    constructor(name) {
        this.name = name
    }

    static getPostBySection(section, callback) {
        global.PostDB.find({
            section
        }).toArray((err, posts) => {
            callback(posts)
        })
    }
}

module.exports = Section