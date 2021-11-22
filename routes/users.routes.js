var express = require('express');
var router = express.Router();

const User = require ("../models/User.model")


// Edit profile
router.route("/profile/edit/:id")
.get( async (req, res) => {
  try{
    const idUser = req.params.id;
    const user = await User.findById(idUser)
    res.render("config/edit-profile", user);
  }
  catch(err){
    console.log(err)
  }
})
.post( async (req, res) => {
  try{
    const {name, surname, username, email, password} = req.body;
    const updateUser = await User.findByIdAndUpdate(req.params.id, {name, surname, username, email, password}, function (err, user){
      if (err) {
        console.log(err)
      } else {
        console.log(user)
      }
    })
    req.session.name = username
    res.redirect(`/profile/${req.params.id}`)
  }
  catch (err) {
    console.log(err)
  }
});

module.exports = router;