var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api")

router.route("/profile/edit")
.get((req,res)=>{
	res.render("editProfile")
})

router.route("/profile")
.get((req,res)=>{
	res.render("profile")
})

/* GET home page. */
router.route("/")
.get((req, res)=> {
  res.render("welcome")
})

/* GET from API */
router.get('/api', (req, res)=> {
  Api.getAll().then((entity)=>
  res.render('index', { title: 'Express', users: entity})
);
});

module.exports = router;
