var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api");
const isLoggedIn = require('../middleware/isLoggedIn');

require("../middleware/isNotLoggedIn")
require("../middleware/isLoggedIn")



router.route("/welcome")
.get(isLoggedIn,(req,res)=>{
  const name = req.session.name
  const _id = req.session._id
  res.render("home/welcome",{name: name, _id: _id})
})

router.route("/profile/edit/:id")
.get(isLoggedIn,(req,res)=>{
	res.render("config/edit-profile")
})

router.route("/profile/:id")
.get(isLoggedIn,(req,res)=>{
  const name = req.session.name
  const _id = req.session._id
	res.render("profile/profile",{name: name, _id: _id})
})

/* GET home page. */
router.route("/")
.get((req, res)=> {
  res.render("home/welcome")
})

// Log out
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) res.render('error');
		else res.redirect('/auth');
	});
});

/* GET from API */
router.get('/api', (req, res)=> {
  Api.getAll().then((entity)=>
  res.render('index', { title: 'Express', users: entity})
);
});

module.exports = router;
