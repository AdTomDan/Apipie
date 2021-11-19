const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	favourites: [
		{
			type: Schema.Types.ObjectId,
			ref: "favourites"
		}
	]
});

const User = model('User', userSchema);

module.exports = User;
