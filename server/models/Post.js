const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  postText: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Post = model('postSchema', postSchema);

module.exports = Post;
