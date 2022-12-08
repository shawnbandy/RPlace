const { Schema, model } = require('mongoose');

const friendSchema = new Schema({
  friendId: {
    type: String,
    required: true,
    trim: true,
  },
});

const Friend = model('friendSchema', friendSchema);

module.exports = Friend;
