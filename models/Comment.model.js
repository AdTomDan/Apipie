const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const commentSchema = new Schema(
    {
		content: {
            type: String,
		    required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {timestamps: true}
	)

const Comment = model('Comment', commentSchema);

module.exports = Comment;
