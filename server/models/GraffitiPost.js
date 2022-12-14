const { Schema, model } = require("mongoose");

const graffitiPostSchema = new Schema({
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

const GraffitiPost = model("graffitiPost", graffitiPostSchema);

module.exports = GraffitiPost;
