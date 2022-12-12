const db = require("../config/connection");
const { User, Post, GraffitiPost } = require("../models");
const userSeeds = require("./userSeeds.json");
const postSeeds = require("./postSeeds.json");
const graffitiPostSeeds = require("./graffitiPostSeeds.json");

db.once("open", async () => {
  try {
    // clear all previous data
    await User.deleteMany({});
    await Post.deleteMany({});
    await GraffitiPost.deleteMany({});

    // create all users from seeds
    await User.create(userSeeds);

    // seed User with Post as subdoc
    for (let i = 0; i < postSeeds.length; i++) {
      // create post
      let { _id, userId } = await Post.create(postSeeds[i]);

      // locate user, add post as subdocument
      await User.findOneAndUpdate(
        { email: userId },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }

    // seed User with GraffitiPost as subdoc
    for (let i = 0; i < graffitiPostSeeds.length; i++) {
      // create post
      let { _id, postingUser } = await GraffitiPost.create(
        graffitiPostSeeds[i]
      );

      // locate user, add post as subdocument
      await User.findOneAndUpdate(
        { email: postingUser },
        {
          $addToSet: {
            posts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("R DB is Seeded!!");
  process.exit(0);
});
