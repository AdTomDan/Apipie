var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api")
const Recipe =  require("../models/Recipe.model")

router.route("/details/:id")
.get(async(req,res)=>{
    try {
        const id = req.params.id
        const recipe = await Recipe.findById(id).populate("author","username")
        console.log("recipe", recipe)
        res.render("library/details",recipe)
    } catch (err) {
        console.log(err)
    }
})

router.route("/list")
.get((req,res)=>{
    res.render("library/list")
})

router.route("/")
.get((req,res)=>{
    res.render("library/library")
})
.post(async(req,res)=>{
    try {
        const {search} = req.body
        const recipes = await Recipe.find({name: {$regex: search}}).populate("author", "username")
        console.log("our search result: ",recipes)
        res.render("library/list", {recipes})
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;