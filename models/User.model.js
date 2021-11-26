const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	surname: {
		type: String
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
		default: "http://www.newdesignfile.com/postpic/2010/11/emoticon-eating-pie_324907.jpg"
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
	}],
	bio: {
		type: String,
		maxLength: 400
	}
});

const User = model('User', userSchema);

module.exports = User;
