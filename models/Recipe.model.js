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
	taste: {
		type: Array,
		items: {
			"type": String,
			"enum": ["Sweet", "Salty", "Sour", "Bitter", "Savory", "Fatty"]
		}
	},
	photo: {
		type: String
	},
	ingredients: [{
		type: String
	}]
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;