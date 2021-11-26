var express = require("express");
var router = express.Router();
const saltRound = 5;
const bcrypt = require("bcrypt");

const fileUploader = require("../config/cloudinary");

const User = require("../models/User.model");

// Edit profile
router
  .route("/profile/edit/:id")
  .get(async (req, res) => {
    try {
      const idUser = req.params.id;
      var canEdit = false;
      const user = await User.findById(idUser);
      console.log("user: ",user)

      res.render("config/edit-profile", {
        user,
        userInfo: req.session.loggedInUser,
      });
    } catch (err) {
      console.log(err);
    }
  })
  .post(fileUploader.single("imgUrl"), async (req, res) => {
    try {
      const { name, surname, username, email, password, bio } = req.body;
      const salt = bcrypt.genSaltSync(saltRound);
      const hashedPwd = bcrypt.hashSync(password, salt);
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        name,
        surname,
        username,
        email,
        password: hashedPwd,
        bio,
        profilePhoto: req.file.path,
      });

      req.session.name = username;
      req.session.loggedInUser = updateUser;
      req.session.id = req.params.id;
      currentUser = username;

      res.redirect(`/profile/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
