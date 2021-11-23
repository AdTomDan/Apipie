var express = require("express");
var router = express.Router();

const fileUploader = require("../config/cloudinary");

const User = require("../models/User.model");
const Api = require("../apis/api");
const Recipe = require("../models/Recipe.model");
const { compareSync } = require("bcrypt");

//DETAILS PIE
router.route("/details/:id").get(async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await Recipe.findById(id).populate("author", "username");

    let showEdit = false;
    let showDelete = false;
    if (req.session.loggedInUser.username == recipe.author.username) {
      showEdit = true; // IF SESSION === AUTHOR, WE CREATE A VARIABLE TO DISPLAY "EDIT PIE" BUTTON
      showDelete = true;
    }
    res.render("library/details", { recipe, showEdit, showDelete });
  } catch (err) {
    console.log(err);
  }
});

router.route("/list").get((req, res) => {
  res.render("library/list");
});

// PIE OF THE WEEK PAGE

router
  .route("/")
  .get(async (req, res) => {
    const randomRecipe = await Recipe.aggregate([{ $sample: { size: 1 } }]);
    res.render("library/library", {
      randomRecipe: randomRecipe[0],
      userInfo: req.session.loggedInUser._id,
    });
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

//SEARCH BY WORD

router.route("/search").get(async (req, res) => {
  try {
    console.log("heeeyy IM HEREEEE");
    const query = req.query.q1;
    const recipes = await Recipe.find({
      name: { $regex: query, $options: "i" },
    });
    res.render("library/list", { recipes });
  } catch (err) {
    console.log(err);
  }
});

//CREATE PIE

router
  .route("/create")
  .get((req, res) => {
    res.render("library/create-recipe");
  })
  .post(fileUploader.single("imgUrl"), async (req, res) => {
    try {
      const {
        name,
        prepTime,
        cookingTime,
        difficulty,
        ingredients,
        steps,
        recipePhoto,
      } = req.body;
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
        recipePhoto: req.file.path,
      });
      res.redirect("/library");
    } catch (err) {
      console.log(err);
    }
  });

//EDIT PIE

router
  .route("/edit/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const recipe = await Recipe.findById(id).populate("author", "username");
      res.render("library/edit-recipe", {
        recipe,
        userInfo: req.session.loggedInUser._id,
      });
    } catch (err) {
      console.log(err);
    }
  })
  .post(fileUploader.single("imgUrl"), async (req, res) => {
    try {
      const {
        name,
        prepTime,
        cookingTime,
        difficulty,
        ingredients,
        steps,
        recipePhoto,
        _id,
      } = req.body;

      const editedRecipe = await Recipe.update({
        name,
        prepTime,
        cookingTime,
        difficulty,
        ingredients,
        steps,
        recipePhoto: req.file.path,
      });
      const id = req.params.id;
      res.redirect(`/library/details/${id}`);
    } catch (err) {
      console.log(err);
    }
  });

router.route("/delete/:id").get(async (req, res) => {
  try {
    let deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    res.redirect("/library");
  } catch (err) {
    console.log(err);
    res.render("/library");
  }
});

module.exports = router;
