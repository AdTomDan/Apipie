var express = require('express');
var router = express.Router();

const fileUploader = require("../config/cloudinary")

const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Comment = require("../models/Comment.model")


router.route("/post/like/:id")
.get(async(req,res)=>{
    try {
    const id = req.params.id
    const currentUser = req.session.loggedInUser
    let postToBeLiked = await Post.findById(id)
    if (postToBeLiked.likes.length === 0) {
        let likedPost = await Post.findByIdAndUpdate(id, {$push:{likes:currentUser._id}})
        let likedCount = await Post.findByIdAndUpdate(id, {$inc:{likeCount:1}})
        res.redirect("/feed")
    }
    else if (postToBeLiked.likes.includes(currentUser._id)) {
        let unlikedPost = await Post.findByIdAndUpdate(id, {$pull:{likes:currentUser._id}})
        let likedCount = await Post.findByIdAndUpdate(id, {$inc:{likeCount:-1}})
        res.redirect("/feed")
    } else {
        let likedPost = await Post.findByIdAndUpdate(id,{$push:{likes:currentUser._id}})
        let likedCount = await Post.findByIdAndUpdate(id, {$inc:{likeCount:1}})
        res.redirect("/feed")
    }
    } catch (err) {
        console.log(err)
    }
})

router.route("/post/comment/:id")
.post(async(req,res)=>{
    try {
        const {content} = req.body
        const newComment = await Comment.create({content,author:req.session.loggedInUser._id})
        const postCommentedOn = await Post.findByIdAndUpdate(req.params.id,{$push:{comments:newComment._id}})
        res.redirect("/feed")
    } catch (err) {
        console.log(Error)
    }
})

router.route("/post")
.post(fileUploader.single("imgUrl"), async(req,res)=>{
    try {
        const {text,image} = req.body
        
        const newPost = await (await Post.create({user: req.session._id,text,image,likes:[],likeCount:0,comments:[]}))
        const allPosts = await Post.find().populate("user", "username").populate("likes", "username").sort({'createdAt': -1})
        const currentUser = req.session.loggedInUser
        res.render("feed/feed",{allPosts, currentUser})
    } catch (err) {
        console.log(err)
    }
})

router.route("/")
.get(async(req,res)=>{
    const allPosts = await Post.find().populate("user", "username").populate("likes", "username").populate({ 
        path: 'comments',
        model: 'Comment',
        populate: {
            path: 'author',
            model: 'User'
        }}).sort({'createdAt': -1})
    
    const currentUser = req.session.loggedInUser
    console.log("all Posts ", allPosts[0].comments)
    res.render("feed/feed",{allPosts, currentUser})
})

module.exports = router;

