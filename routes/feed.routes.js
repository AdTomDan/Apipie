var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Post = require("../models/Post.model")

router.route("/")
.get(async(req,res)=>{
    const allPosts = await Post.find().populate("user", "username").sort({'createdAt': -1})
    res.render("feed/feed",{allPosts})
})

router.route("/post")
.post(async(req,res)=>{
    try {
        const {text,image} = req.body

        const newPost = await (await Post.create({user: req.session._id,text,image,likes:null,likeCount:0,comments:null}))
        console.log("new post is: ",newPost)

        const allPosts = await Post.find().populate("user", "username").sort({'createdAt': -1})
        console.log(allPosts)
        res.render("feed/feed",{allPosts})
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;

