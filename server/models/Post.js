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
      commentText: {
        type: String,
        required: true,
        minlength: 1,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        //get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Post = model('postSchema', postSchema);

module.exports = Post;
