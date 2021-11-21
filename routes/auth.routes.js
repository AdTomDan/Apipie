var express = require('express');
var router = express.Router();
const session = require("express-session")
const saltRound = 5;
const bcrypt = require('bcrypt');

const User = require("../models/User.model")
const Api = require("../apis/api")

router.route("/") // LOGIN
.get((req, res)=> {
  res.render("auth/login")
})
.post(async(req, res)=>{
  try {
    const {username,password} = req.body

	  if(!username || !password) res.render('auth/login',{errorMessage:"Username/password not provided."})

	  const user = await User.findOne({username})
    console.log("this is user", user)
    
		if(!user) res.render('auth/login',{errorMessage:"Username does not exist."})
    
		const isPwdCorrect = bcrypt.compareSync(password, user.password)

    console.log("isPwdCorrect: ",isPwdCorrect)
    
    console.log("both passwords:", password, user.password)

		if(isPwdCorrect) {
			req.session.loggedInUser = user
      req.session.name = user.name
      req.session._id = user._id
      res.redirect("/welcome")
		} 
		else res.render('auth/login',{errorMessage:"Username/password incorrect."})
  } catch (err) {
    console.log(err)
  }
})

router.route("/signup") //SIGN UP
.get((req,res)=>{
    res.render("auth/signup")
})
.post((req,res)=>{
    const {name,surname,username,email, password} = req.body
    if(!name || !surname || !username|| !email || !password) res.render('auth/signup')

    User.findOne({username})
    .then(async(user)=>{
      try {
      if(user) res.render('auth/signup',{errorMessage:"User exists."})
          
          const salt = bcrypt.genSaltSync(saltRound)
          const hashedPwd = bcrypt.hashSync(password,salt)
          
          const newUser = await User.create({name,surname,username,email,password:hashedPwd})
          res.redirect("/auth", newUser)
      } catch (err){
        res.render("auth/signup",{errorMessage: "Database broken"})
      }
    })
  })

module.exports = router;
