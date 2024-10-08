const postModel = require('../model/post');

/*
endpoint: /add-new-post
function: addNewPost
description: API endpoint to add new post
*/
exports.addNewPost = async (req, res) => {
    console.log("Inside addNewPost");
    try {
        const postData = req.body;
        //create and save post
        const post = new postModel({
            message: postData.message,
            author: postData.author,
            timestamp: postData.timestamp,
            likes: postData.likes
        });
        post.save();

        res.status(200).send({
            message: "Post added successfully",
            time: new Date()
        });
    } catch (error) {
        console.log("Error inside addNewPost: ", error);
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
}

/*
endpoint: /update-post
function: updatePost
description: API endpoint to update post
*/
exports.updatePost = async (req, res) => {
    console.log("Inside updatePost");
    try {
        const _id = req.params.id;
        const username = req.params.username;
        const post = await postModel.findOne({ _id: _id });
        const index = post?.likes?.users_liked?.indexOf(username) ?? -1;

        if (index === -1) {
            post?.likes?.users_liked?.push(username);
            if (post && post.likes) {
                post.likes.count = (post.likes.count || 0) + 1;
            }
        } else {
            post?.likes?.users_liked?.splice(index, 1);
            if (post && post.likes) {
                post.likes.count = (post.likes.count || 0) - 1;
            }
        }
        post.save();
        res.status(200).send({
            message: post,
            time: new Date()
        });
    } catch (error) {
        console.log("Error inside updatePost: ", error);
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
}

/*
endpoint: /get-all-posts
function: getAllPosts
description: API endpoint to fetch posts of all users
*/
exports.getAllPosts = async (req, res) => {
    console.log("Inside getAllPosts");
    const pageNumber = parseInt(req.params.pageNumber) || 1;
    const perPage = 10; // Number of posts per page
    const skip = (pageNumber - 1) * perPage;

    try {
        //fetch all posts in batches
        const posts = await postModel.find()
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(perPage)
            .exec();
        res.status(200).send({
            posts: posts,
            time: new Date()
        });
    } catch (error) {
        console.log("Error inside getAllPosts: ", error);
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
}

/*
endpoint: /get-posts
function: getPosts
description: API endpoint to fetch posts of specific user
*/
exports.getPosts = async (req, res) => {
    console.log("Inside getPosts");
    const username = req.params.username;
    const pageNumber = parseInt(req.params.pageNumber) || 1;
    const perPage = 10; // Number of posts per page
    const skip = (pageNumber - 1) * perPage;

    try {
        //fetch all posts in batches
        const posts = await postModel.find({ 'author.username': username })
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(perPage)
            .exec();
        res.status(200).send({
            posts: posts,
            time: new Date()
        });
    } catch (error) {
        console.log("Error inside getPosts: ", error);
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
}

/*
endpoint: /delete-post
function: deletePost
description: API endpoint to delete post of a user
*/
exports.deletePost = async (req, res) => {
    console.log("Inside deletePost");
    const id = req.params.id;
    try {
        //delete post
        const response = await postModel.deleteOne({ _id: id });
        res.status(200).send({
            message: "Post deleted successfully",
            time: new Date()
        });
    } catch (error) {
        console.log("Error inside deletePost: ", error);
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
}