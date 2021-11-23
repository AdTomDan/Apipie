const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	surname: {
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
	profilePhoto: {
		type: String,
	},
	favourites: [
		{
			type: Schema.Types.ObjectId,
			ref: "favourites"
		}
	],
	friends: [{
		type: Schema.Types.ObjectId,
		ref: "User"
	}]
});

const User = model('User', userSchema);

module.exports = User;
