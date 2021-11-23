var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Post = require("../models/Post.model")
const Recipe = require("../models/Recipe.model")
const Api = require("../apis/api");
const isLoggedIn = require('../middleware/isLoggedIn');

require("../middleware/isNotLoggedIn")
require("../middleware/isLoggedIn")



router.route("/welcome")
.get(isLoggedIn,(req,res)=>{
  const name = req.session.name
  const _id = req.session._id
  res.render("home/welcome",{name: name, _id: _id, userInfo: req.session.loggedInUser._id})
})

router.route("/profile/edit/:id")
.get(isLoggedIn,(req,res)=>{
	res.render("config/edit-profile", {userInfo: req.session.loggedInUser._id})
})

router.route("/profile/:id")
.get(isLoggedIn,async(req,res)=>{
  const user = await User.findById(req.params.id).populate("friends","name surname username")
  const userPosts = await Post.find({user: user._id}).sort({'createdAt': -1})
  const userRecipes = await Recipe.find({author: user._id}).sort({'createdAt': -1})
  console.log(user)
	res.render("profile/profile", {user: user, userPosts: userPosts, userRecipes: userRecipes, userInfo: req.session.loggedInUser._id})
})

/* GET home page. */
router.route("/")
.get(isLoggedIn,(req, res)=> {
  const name = req.session.name
  console.log("req.session.loggedInUser._id ===", req.session.loggedInUser._id)
  res.render("home/welcome", {name, userInfo: req.session.loggedInUser._id})
})

// Log out
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) res.render('error');
		else res.redirect('/auth');
	});
});

module.exports = router;
