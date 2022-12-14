const { Schema, model } = require("mongoose");

const profileSchema = new Schema({
  // background styling, to be applied to parent component
  backgroundStyling: {
    type: String,
    unique: false,
    trim: true,
  },

  // point to src of profile pic
  profilePicture: {
    type: String,
    unique: false,
    trim: true,
  },

  // biography of user
  aboutMe: {
    type: String,
    unique: false,
    trim: true,
  },

  // age of user
  age: {
    type: String,
    unique: false,
    trim: true,
  },

  // relationship status
  status: {
    type: String,
    unique: false,
    trim: true,
  },

  friend1: {
    type: String,
    unique: false,
    trim: true,
  },
  friend2: {
    type: String,
    unique: false,
    trim: true,
  },
  friend3: {
    type: String,
    unique: false,
    trim: true,
  },
  // html w inline styling for media e.g. spotify iframe
  mediaContainer: {
    type: String,
    unique: false,
    trim: true,
  },

  // container for iframe of website
  widgetContainer: {
    type: String,
    unique: false,
    trim: true,
  },
});

module.exports = profileSchema;
