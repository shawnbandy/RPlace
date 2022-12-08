const { Schema, model } = require('mongoose');

const proPagePostSchema = new Schema({
  postingUser: {
    type: String,
    required: true,
    trim: true,
  },

  receivingUser: {
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
});

const ProPagePost = model('proPagePostSchema', proPagePostSchema);

module.exports = ProPagePost;
