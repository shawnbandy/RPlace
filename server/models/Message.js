const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  textBody: {
    type: String,
    required: true,
    minlength: 1,
  },
  sender: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
});

const Message = model('messageSchema', messageSchema);

module.exports = Message;
