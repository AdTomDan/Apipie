const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const recipeSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	name: {
		type: String,
		required: true,
	},
	prepTime: {
		type: Number,
		required: true
	},
	cookingTime: {
		type: Number,
		required: true,
	},
	difficulty: {
		"type": String,
		"enum": ["Easy", "Intermediate", "Advanced"]
	},
	ingredients: [{
		type: String,
		required: true,
	}],
	steps: [{
		type: String,
		required: true,
	}],
	imgUrl: {
		type: String, 
		default: 'https://thecrites.com/sites/all/modules/cookbook/theme/images/default-recipe-big.png'
	}
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;