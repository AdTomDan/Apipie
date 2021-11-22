var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const Api = require("../apis/api");
const Recipe = require("../models/Recipe.model");

router.route("/details/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findById(id).populate("author", "username");
    if (req.session.loggedInUser.username == recipe.author.username) {
      var showEdit = true; // IF SESSION === AUTHOR, WE CREATE A VARIABLE TO DISPLAY "EDIT PIE" BUTTON
    }
    res.render("library/details", { recipe, showEdit });
  } catch (err) {
    console.log(err);
  }
});

router.route("/list").get((req, res) => {
  res.render("library/list");
});

router
  .route("/")
  .get((req, res) => {
    res.render("library/library");
  })
  .post(async (req, res) => {
    try {
      const { search } = req.body;
      const recipes = await Recipe.find({
        name: { $regex: search, $options: "i" },
      }).populate("author", "username");
      res.render("library/list", { recipes });
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/create")
  .get((req, res) => {
    res.render("library/create-recipe");
  })
  .post(async (req, res) => {
    try {
      const { name, prepTime, cookingTime, difficulty, ingredients, steps } =
        req.body;
      let splitIngredients = ingredients.split(" ");
      let splitSteps = steps.split("/");

      const newRecipe = await Recipe.create({
        author: req.session._id,
        name,
        prepTime,
        cookingTime,
        difficulty,
        ingredients: splitIngredients,
        steps: splitSteps,
      });
      //    console.log("new recipe is: ",newRecipe)
      res.redirect("/library");
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/edit/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const recipe = await Recipe.findById(id).populate("author", "username");
      //    console.log(recipe)
      res.render("library/edit-recipe", recipe);
    } catch (err) {
      console.log(err);
    }
  })
  .post(async (req, res) => {
    try {
      const {
        name,
        prepTime,
        cookingTime,
        difficulty,
        ingredients,
        steps,
        _id,
      } = req.body;

      const editedRecipe = await Recipe.update({
        name,
        prepTime,
        cookingTime,
        difficulty,
        ingredients,
        steps,
      });
      //    console.log("Edited recipe: ",editedRecipe);
      const id = req.params.id;
      res.redirect(`/library/details/${id}`);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
