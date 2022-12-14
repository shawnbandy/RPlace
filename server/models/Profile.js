const { Schema, model } = require("mongoose");

//*these will be posts directly made on the user profile, like to graffiti the page
const graffitiPost = new Schema({
  postTest: {
    type: String,
    unique: false,
    trim: true,
  },
});

const profileSchema = new Schema({
  graffitiPosts: [graffitiPost], // array of graffiti posts
  profileConfig: {
    type: String,
    unique: false,
    trim: true,
  },
  // profile config template
  // color theme
  // youtube
  // spotify
});

const Profile = model("profile", profileSchema);

module.exports = Profile;
