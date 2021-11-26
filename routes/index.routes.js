var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Recipe = require("../models/Recipe.model");
const Api = require("../apis/api");
const isLoggedIn = require("../middleware/isLoggedIn");

require("../middleware/isNotLoggedIn");
require("../middleware/isLoggedIn");

router.route("/welcome").get(isLoggedIn, (req, res) => {
  const name = req.session.name;
  const _id = req.session._id;
  res.render("home/welcome", {
    name: name,
    _id: _id,
    userInfo: req.session.loggedInUser,
  });
});

router.route("/profile/edit/:id").get(isLoggedIn, (req, res) => {
  res.render("config/edit-profile", { userInfo: req.session.loggedInUser });
});


router.route("/profile/connect/:id")
.get(async(req,res)=>{
    try {
    const friendToFollow = req.params.id
    const currentUser = req.session.loggedInUser

    let followFriend = await User.findByIdAndUpdate(currentUser._id,{$push:{friends:friendToFollow}},{new:true})
    
    const updatedCurrentUser = await User.findById(currentUser._id)
    req.session.loggedInUser = updatedCurrentUser

    res.redirect(`/profile/${friendToFollow}`)
    } catch (err) {
        console.log(err)
    }
})

router.route("/profile/disconnect/:id")
.get(async(req,res)=>{
    try {
    const friendToUnFollow = req.params.id
    const currentUser = req.session.loggedInUser

    let unFollowFriend = await User.findByIdAndUpdate(currentUser._id,{$pull:{friends:friendToUnFollow}},{new:true})
    
    const updatedCurrentUser = await User.findById(currentUser._id)
    req.session.loggedInUser = updatedCurrentUser

    res.redirect(`/profile/${friendToUnFollow}`)
    } catch (err) {
        console.log(err)
    }
});

router.route("/profile/:id").get(isLoggedIn, async (req, res) => {
  const user = await User.findById(req.params.id).populate("friends");
  const userPosts = await Post.find({ user: user._id }).sort({ createdAt: -1 });
  console.log("userPosts: ",userPosts)
  const userRecipes = await Recipe.find({ author: user._id }).sort({
    createdAt: -1,
  });
  console.log(req.params.id, req.session.loggedInUser._id)
  let editButton = false;
  if (req.params.id == req.session.loggedInUser._id) {
    editButton = true;
  }
  console.log(editButton)
  let areFriends = false
  req.session.loggedInUser.friends.includes(req.params.id) ? areFriends = true : areFriends = false
  console.log("req.session.loggedInUser.friends: ",req.session.loggedInUser.friends)
  console.log("req.params.id: ", req.params.id)
  console.log("areFriends: ",areFriends)
  res.render("profile/profile", {
    user: user,
    userPosts: userPosts,
    userRecipes: userRecipes,
    userInfo: req.session.loggedInUser,
    editButton,
    areFriends
  });
});


// Log out
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) res.render("error");
    else res.redirect("/auth");
  });
});

/* GET home page. */
router.route("/").get(isLoggedIn, (req, res) => {
  const name = req.session.name;
  console.log("req.session.loggedInUser._id ===", req.session.loggedInUser._id);
  res.render("home/welcome", { name, userInfo: req.session.loggedInUser });
});

module.exports = router;
