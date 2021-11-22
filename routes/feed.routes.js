var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Post = require("../models/Post.model")


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

router.route("/post")
.post(async(req,res)=>{
    try {
        const {text,image} = req.body
        
        const newPost = await (await Post.create({user: req.session._id,text,image,likes:[],likeCount:0,comments:null}))
        const allPosts = await Post.find().populate("user", "username").populate("likes", "username").sort({'createdAt': -1})
        const currentUser = req.session.loggedInUser
        res.render("feed/feed",{allPosts, currentUser})
    } catch (err) {
        console.log(err)
    }
})

router.route("/")
.get(async(req,res)=>{
    const allPosts = await Post.find().populate("user", "username").populate("likes", "username").sort({'createdAt': -1})
    const currentUser = req.session.loggedInUser
    res.render("feed/feed",{allPosts, currentUser})
})

module.exports = router;

