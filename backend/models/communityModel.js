const mongoose = require('mongoose');

// Define the comment schema
const commentSchema = new mongoose.Schema({
    content: { type: String, required: false },
    author: {
        name: String,
        email: String,
        image: String,
    },
    createdAt: { type: Date, default: Date.now },
});


const postSchema = new mongoose.Schema({
    content: { type: String, required: false },
    author: {
        name: String,
        email: String,
        image: String,
    },
    comments: [commentSchema],
    community: { type: String, required: false }, 
    createdAt: { type: Date, default: Date.now },
});


const Post = mongoose.model('Post', postSchema)

module.exports = Post;
