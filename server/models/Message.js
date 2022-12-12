const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  chatters: [
    {
      user: {
        type: String,
        required: true,
      },
    },
  ],

  dm: [
    {
      messageContent: {
        type: String,
        required: true,
        minlength: 1,
      },
      messageAuthor: {
        type: String,
        required: true,
      },
    },
  ],
});

const Message = model('messageSchema', messageSchema);

module.exports = Message;
