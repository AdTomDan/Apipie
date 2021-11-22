const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const postSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	image: {
		type: String
    },
	text: {
		type: String
	},
    likes: [{
		type: Schema.Types.ObjectId,
		ref: "user"
	}],
	likeCount: {type: Number},
    comments: [{
        type: Schema.Types.ObjectId,
		ref: "comment"
    }]},
	{timestamps: true}
);

const Post = model('Post', postSchema);

module.exports = Post;