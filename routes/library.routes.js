var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api")
const Recipe =  require("../models/Recipe.model")

router.route("/details/:id")
.get((req,res)=>{
    res.render("details")
})

router.route("/list")
.get((req,res)=>{
    res.render("list")
})

router.route("/")
.get((req,res)=>{
    res.render("library")
})