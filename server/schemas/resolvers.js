const {
  Comment,
  Conversation,
  Friend,
  Message,
  PendingFriend,
  Post,
  GraffitiPost,
  User,
} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const GraffitiPost = require('../models/GraffitiPost');

const resolvers = {
  //TODO User
  //*user: find your user, populate all the posts from you
  //*post: find your user, get your friends, populate all their posts/comments on your home page
  Query: {
    //*user will get all of the user's friends, which will hold all of their data. Only need the posts from it
    user: async (parent, { userId }) => {
      return User.findOne({ userId }).populate('friends');
    },
    //*gets all of the user's posts/comments
    userPost: async (parent, { userId }) => {
      return User.findOne({ userId }).populate('posts');
    },
    //*gets all of the user's graffiti
    userGraffitiPost: async (parent, { userId }) => {
      return User.findOne({ userId }).populate('graffitiPosts');
    },
    //*returns all the messages the user is a part of
    userMessage: async (parent, { userId }) => {
      return User.findOne({ userId }).populate('messages');
    },
    userPendingFriend: async (parent, { userId }) => {
      return User.findOne({ userId }).populate('pendingFriends');
    },
    //*gets the logged in user's posts
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('posts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    //!add the sign token right after

    addPost: async (parent, { postText }, context) => {
      if (context.user) {
        const newPost = await Post.create({
          postText: postText,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: newPost._id } },
          { new: true }
        );

        return context.user;
      }
    },

    //*finds a post and updates it with the comment by adding it to the array
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: {
                commentText: commentText,
                commentAuthor: context.user._id,
              },
            },
          },
          { new: true }
        );

        return post;
      }
    },

    //*adds a user to another user's pending friend list
    //?later, we can just check to see if the context.user.id is on any other pending lists to populate those
    sendPendingFriend: async (parent, { receiverId }, context) => {
      //*context user is the sender of the request
      if (context.user && receiverId) {
        const user = User.findOneAndUpdate(
          { _id: receiverId },
          { $addToSet: { pendingFriends: context.user._id } }
        );
        return user;
      }
    },

    //*accept a friend= add them to the friend array, remove them from the pending friend request
    addFriend: async (parent, { requesterId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: requesterId } },
          { $pull: { pendingFriends: requesterId } },
          { new: true }
        );

        return user;
      }
    },

    //*posts directly to someone's profile
    addGraffiti: async (parent, { receivingUser, postText }, context) => {
      //*context.user is the poster
      if (context.user) {
        const newGraffiti = await GraffitiPost.create({
          postingUser: context.user._id,
          receivingUser: receivingUser,
          postText: postText,
        });

        const user = await User.findOneAndUpdate(
          { _id: receivingUser },
          { $addToSet: { graffitiPosts: newGraffiti } },
          { new: true }
        );

        return { newGraffiti, user };
      }
    },
  },
};

module.exports = resolvers;
