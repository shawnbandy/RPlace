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

  // specific qualities to display on page
  details: {
    age: {
      type: String,
      unique: false,
      trim: true,
    },
    status: {
      type: String,
      unique: false,
      trim: true,
    },
  },

  // html w inline styling for media e.g. spotify iframe
  mediaContainer: {
    type: String,
    unique: false,
    trim: true,
  },

  // container for iframe of website
  portfolioContainer: {
    type: String,
    unique: false,
    trim: true,
  },
});

module.exports = profileSchema;
