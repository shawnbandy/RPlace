const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],

  userOne: {
    type: String,
    required: true,
  },

  userTwo: {
    type: String,
    required: true,
  },
});

const Conversation = model('conversationSchema', conversationSchema);

module.exports = Conversation;
