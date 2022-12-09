const db = require("../config/connection");
const { User, Post } = require("../models");
const userSeeds = require("userSeeds.js");
const postSeeds = require("postSeeds.js");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    // seed subdocuments Posts within User
    for (let i = 0; i < postSeeds.length; i++) {
      // create post
      const { _id, postAuthor } = await Post.create(postSeeds[i]);

      // locate user, add post as subdocument
      const user = await User.findOneAndUpdate(
        { username: postAuthor },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );

      // todo seed comments within posts db
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("R DB is Seeded!!");
  process.exit(0);
});
