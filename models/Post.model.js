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
<<<<<<< HEAD
		ref: "User",
=======
		ref: "User"
>>>>>>> 0431ecb65968259119b475c5e81105048d072338
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