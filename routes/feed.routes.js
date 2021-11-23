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

router.route("/connect")
.get((req,res)=>{
    res.render("feed/connect")
})
.post(async (req, res) => {
    try {
      const {search} = req.body;
      const users = await User.find({
        name: { $regex: search, $options: "i" },
      })
      console.log("test users: ",users)

      const currentUser = await User.findById(req.session.loggedInUser._id)
      console.log("currentUser: ", currentUser)

      let userFriends = []
      let userNotFriends = []

      users.forEach(user=>{
          if(currentUser.friends.includes(user._id)) {
              userFriends.push(user)
          } else {
              userNotFriends.push(user)
          }
      })

      res.render("feed/connect",{userFriends,userNotFriends})
      } catch (err) {
        console.log(err);
    }
  });

router.route("/connect/:id")
.get(async(req,res)=>{
    try {
    const friendToFollow = req.params.id
    const currentUser = req.session.loggedInUser

    let followFriend = await User.findByIdAndUpdate(currentUser._id,{$push:{friends:friendToFollow}},{new:true})
    
    res.redirect("/feed/connect")
    } catch (err) {
        console.log(err)
    }
})

router.route("/disconnect/:id")
.get(async(req,res)=>{
    try {
    const friendToUnFollow = req.params.id
    const currentUser = req.session.loggedInUser

    let unFollowFriend = await User.findByIdAndUpdate(currentUser._id,{$pull:{friends:friendToUnFollow}},{new:true})
    
    res.redirect("/feed/connect")
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
    
    const currentUser = await User.findById(req.session.loggedInUser._id)
    res.render("feed/feed",{allPosts, currentUser,userInfo: req.session.loggedInUser._id})
    
})
.post(fileUploader.single("imgUrl"), async(req,res)=>{
    try {
        const {text,image} = req.body
        
        const newPost = await (await Post.create({user: req.session._id,text,image,likes:[],likeCount:0,comments:[], postPhoto:req.file.path}))
        const allPosts = await Post.find().populate("user", "username").populate("likes", "username").sort({'createdAt': -1})
        let currentUser = req.session.loggedInUser;
        res.render("feed/feed",{allPosts, currentUser, userInfo: req.session.loggedInUser._id})
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;

