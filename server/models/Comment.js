const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },

  postId: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});

const Comment = model('commentSchema', commentSchema);

module.exports = Comment;
