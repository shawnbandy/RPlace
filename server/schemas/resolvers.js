const {
  Comment,
  Conversation,
  Friend,
  Message,
  PendingFriend,
  Post,
  ProPagePost,
  User,
} = require('../models');
const { AuthenticationError } = require('apollo-server-express');

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
          { $addToSet: { posts: newPost._id } }
        );

        return context.user;
      }
    },
  },
};

module.exports = resolvers;
