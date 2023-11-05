const mongoose = require('../db');

const replySchema = new mongoose.Schema({
    message: String,
    author: String,
    timestamp: String,
});

const commentSchema = new mongoose.Schema({
    message: String,
    author: String,
    replies: [replySchema],
});

const likeSchema = new mongoose.Schema({
    count: Number,
    users_liked: [String],
});

const postSchema = new mongoose.Schema({
    message: String,
    author: String,
    timestamp: String,
    likes: likeSchema,
    comments: [commentSchema]
}, {
    timestamps: false, // Enable/Disable timestamps for createdAt and updatedAt
}, { versionKey: false });
const postModel = new mongoose.model("post", postSchema);
module.exports = postModel;