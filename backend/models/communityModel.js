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

// Define the post schema
const postSchema = new mongoose.Schema({
    content: { type: String, required: false },
    author: {
        name: String,
        email: String,
        image: String,
    },
    comments: [commentSchema],
    community: { type: String, required: false }, // Example: 'General', 'Coding', etc.
    createdAt: { type: Date, default: Date.now },
});

// Create the Post model
const Post = mongoose.model('Post', postSchema)

module.exports = Post;
