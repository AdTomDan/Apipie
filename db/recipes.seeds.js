//TO BE EDITED. ALL OF IT.

require("dotenv").config();

console.log("THIS IS IT:", process.env.MONGODB_URI);

const RECIPES = [
  {
    author: "619a8a823259e9423cba3f42",
    name: "Autumn Cheesecake Pie",
    prepTime: 30,
    cookingTime: 110,
    difficulty: "Intermediate",
    ingredients: [
      "1 cup graham cracker crumbs",
      "½ cup finely chopped pecans",
      "3 tablespoons white sugar",
      " ½ teaspoon ground cinnamon",
      "¼ cup unsalted butter, melted",
      "2 (8 ounce) packages cream cheese, softened",
      "2 eggs",
      "½ teaspoon vanilla extract",
      "4 cups apples - peeled, cored and thinly sliced",
      "⅓ cup white sugar",
      "½ teaspoon ground cinnamon",
      "¼ cup chopped pecans",
    ],
    steps: [
      "Preheat oven to 350 degrees F (175 degrees C). In a large bowl, stir together the graham cracker crumbs, 1/2 cup finely chopped pecans, 3 tablespoons sugar, 1/2 teaspoon cinnamon and melted butter; press into the bottom of a 9 inch springform pan. Bake in preheated oven for 10 minutes.",
      "In a large bowl, combine cream cheese and 1/2 cup sugar. Mix at medium speed until smooth. Beat in eggs one at a time, mixing well after each addition. Blend in vanilla; pour filling into the baked crust.",
      "In a small bowl, stir together 1/3 cup sugar and 1/2 teaspoon cinnamon. Toss the cinnamon-sugar with the apples to coat. Spoon apple mixture over cream cheese layer and sprinkle with 1/4 cup chopped pecans.",
      "Bake in preheated oven for 60 to 70 minutes. With a knife, loosen cake from rim of pan. Let cool, then remove the rim of pan. Chill cake before serving.",
    ],
  },
  {
    author: "619a8a823259e9423cba3f42",
    name: "Autumn Cheesecake Pie",
    prepTime: 30,
    cookingTime: 110,
    difficulty: "Intermediate",
    ingredients: [
      "1 cup graham cracker crumbs",
      "½ cup finely chopped pecans",
      "3 tablespoons white sugar",
      " ½ teaspoon ground cinnamon",
      "¼ cup unsalted butter, melted",
      "2 (8 ounce) packages cream cheese, softened",
      "2 eggs",
      "½ teaspoon vanilla extract",
      "4 cups apples - peeled, cored and thinly sliced",
      "⅓ cup white sugar",
      "½ teaspoon ground cinnamon",
      "¼ cup chopped pecans",
    ],
    steps: [
      "Preheat oven to 350 degrees F (175 degrees C). In a large bowl, stir together the graham cracker crumbs, 1/2 cup finely chopped pecans, 3 tablespoons sugar, 1/2 teaspoon cinnamon and melted butter; press into the bottom of a 9 inch springform pan. Bake in preheated oven for 10 minutes.",
      "In a large bowl, combine cream cheese and 1/2 cup sugar. Mix at medium speed until smooth. Beat in eggs one at a time, mixing well after each addition. Blend in vanilla; pour filling into the baked crust.",
      "In a small bowl, stir together 1/3 cup sugar and 1/2 teaspoon cinnamon. Toss the cinnamon-sugar with the apples to coat. Spoon apple mixture over cream cheese layer and sprinkle with 1/4 cup chopped pecans.",
      "Bake in preheated oven for 60 to 70 minutes. With a knife, loosen cake from rim of pan. Let cool, then remove the rim of pan. Chill cake before serving.",
    ],
  },
];

const mongoose = require("mongoose");

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");

const MONGO_URI = process.env.MONGODB_URI;

const fillDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`Connected to Mongo!`);
    const deleteRecipes = await Recipe.deleteMany();
    const createdRecipe = await Recipe.create(RECIPES);
    const allPies = await Recipe.find().populate("author", "username");
    console.log(allPies)
  } catch (err) {
    console.error("Error connecting to mongo: ", err);
  }
  console.log("Disconnecting from the database...");
  //mongoose.disconnect();
};
fillDatabase();
