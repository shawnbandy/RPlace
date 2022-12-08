const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],

  //*these will be posts directly made on the user profile, like to graffiti the page
  profile_Posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ProPagePosts',
    },
  ],

  //*comments the user makes
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post_Comment',
    },
  ],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Friends',
    },
  ],

  pendingFriends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'PendingFriends',
    },
  ],

  profile: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
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
