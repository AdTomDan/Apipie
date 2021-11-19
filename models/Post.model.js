const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const postSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user"
	},
	image: {type: String
    },
    likes: [{
		type: Schema.Types.ObjectId,
		ref: "user"
	}],
    comments: [{
        type: Schema.Types.ObjectId,
		ref: "comment"
    }]
});

const Post = model('Post', postSchema);

module.exports = Post;