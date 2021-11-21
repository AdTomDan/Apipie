RECIPES = {
	author: "Apipie",
	name: {
		type: String,
		required: true,
	},
	taste: {
		type: Array,
		items: {
			"type": String,
			"enum": [Sweet, Salty, Sour, Bitter, Savory, Fatty]
		}
	},
	photo: {
		type: String
	},
	ingredients: [{
		type: String
	}]},
    {}
