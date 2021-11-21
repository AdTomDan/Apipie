const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const recipeSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	name: {
		type: String,
		required: true,
	},
<<<<<<< HEAD
	taste: {
		type: Array,
		items: {
			"type": String,
			"enum": ["Sweet", "Salty", "Sour", "Bitter", "Savory", "Fatty"]
		}
=======
	prepTime: {
		type: Number,
		required: true
>>>>>>> 7abe848377e41192a0de1242ef7ef719e85cebca
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
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;