const { Schema, model } = require('mongoose');

const postSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	postPhoto: {
		type: String
    },
	text: {
		type: String
	},
    likes: [{
		type: Schema.Types.ObjectId,
		ref: "User",
	}],
	likeCount: {type: Number},
    comments: [{
        type: Schema.Types.ObjectId,
		ref: "Comment"
    }]},
	{timestamps: true}
);

const Post = model('Post', postSchema);

module.exports = Post;