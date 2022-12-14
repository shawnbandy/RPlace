const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  //*ID
  chatters: [
    {
      //*Shawn, Mac
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

const Message = model("message", messageSchema);

module.exports = Message;
