var express = require('express');
var router = express.Router();

const User = require("../models/User.model")

router.route("/")
.get((req,res)=>{
    res.render("feed/feed")
})

module.exports = router;

