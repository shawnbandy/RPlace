const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  //*post/comment individual user has
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],

  //*these will be posts directly made on the user profile, like to graffiti the page
  graffitiPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'GraffitiPost',
    },
  ],

  //*this includes all your friends posts and comments
  friends: [
    {
      type: String,
      required: false,
    },
  ],

  //*people you have yet to accept
  pendingFriends: [
    {
      type: String,
      required: true,
    },
  ],

  profile: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],

  //*maybe make this a string instead since user is only supposed to have the ID of the message thread?
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
