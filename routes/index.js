var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api")

/* GET home page. */
router.route("/")
.get('/', (req, res)=> {
  res.render("login")
})
.post((req, res)=>{
  const {username,password} = req.body
	if(!username||!password) res.render('login',{errorMessage:"Username/password not provided."})
	User.findOne({username})
	.then((user)=>{
		if(!user) res.render('login',{errorMessage:"Username does not exist."})
		const isPwdCorrect = bcrypt.compareSync(password,user.password)
		if(isPwdCorrect) {
			req.session.loggedInUser = user
			res.render("user-profile")
		} 
		else res.render('login',{errorMessage:"Username/password incorrect."})
	})
})

/* GET from API */
router.get('/api', (req, res)=> {
  Api.getAll().then((entity)=>
  res.render('index', { title: 'Express', users: entity})
);
});

module.exports = router;
