const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userId: { type : String, required: true},
    text: { type : String, required: true},
    imageUrl: { type : String, required: false},
    likes: { type : Number, required: false, default: 0},
    usersLiked: { type: [String], required: true, default: [] },
})

module.exports = mongoose.model('Post', postSchema)