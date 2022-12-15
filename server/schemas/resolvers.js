const { Message, Post, GraffitiPost, User } = require("../models");
const { AuthenticationError, ApolloError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  //TODO User
  //*user: find your user, populate all the posts from you
  //*post: find your user, get your friends, populate all their posts/comments on your home page
  Query: {
    //*user will get all of the user's friends, which will hold all of their data. Only need the posts from it
    //TODO find each friend's post
    allUser: async () => {
      return User.find({});
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate("friends");
    },
    //*gets all of the user's posts/comments
    userPost: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    //*gets all of the user's graffiti
    userGraffitiPost: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate("graffitiPosts");
    },
    //*returns all the messages the user is a part of
    userMessage: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate("messages");
    },
    userPendingFriend: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate("pendingFriends");
    },

    userHomePage: async (parent, { userId }) => {
      const user = await User.findOne({ userId }).populate("friends");
      const postArr = [];
      return user;
    },

    //*gets the logged in user's posts
    me: async (parent, args, context) => {
      // if (context.user) {
      //   return User.findOne({ _id: context.user._id }).populate('posts');
      // }
      const id = "639a57d32d2921e945d7bcf8";
      try {
        const user = await User.findOne({ _id: id });
        return user;
      } catch (e) {
        (e) => console.log(e);
        return new ApolloError();
      }

      // throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { email, firstName, lastName, password }) => {
      console.log('backend user');
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },

    deleteUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findByIdAndDelete({ _id: context.user._id });
        return user;
      }
    },

    //*may have to figure out how to not update null objects
    updateUser: async (
      parent,
      { firstName, lastName, email, password },
      context
    ) => {
      const { currentFirst, currentLast, currentEmail, currentPW } =
        await User.findOne({ _id: context.user._id });

      firstName ? firstName : currentFirst;
      lastName ? lastName : currentLast;
      email ? email : currentEmail;
      password ? password : currentPW;

      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { firstName: firstName },
          { lastName: lastName },
          { email: email },
          { password: { password } }
        );

        return updatedUser;
      }
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Email address not found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect email/password");
      }

      const token = signToken(user);

      return { token, user };
    },

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

        return newPost;
      }
    },

    deletePost: async (parent, { postId }, context) => {
      if (context.user) {
        const updateUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: postId } },
          { new: true }
        );

        const deletedPost = await Post.findByIdAndDelete({ _id: postId });

        return updateUser;
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

    deleteComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        const updatePost = await Post.findByIdAndUpdate(
          { _id: postId },
          { $pull: { comments: commentId } },
          { new: true }
        );

        return updatePost;
      }
    },

    //*adds a user to another user's pending friend list
    //?later, we can just check to see if the context.user.id is on any other pending lists to populate those
    sendPendingFriend: async (parent, { receiverId }, context) => {
      //*context user is the sender of the request
      if (context.user && receiverId) {
        const user = User.findOneAndUpdate(
          { _id: receiverId },
          { $addToSet: { pendingFriends: context.user._id } },
          { new: true }
        );
        return user;
      }
    },

    deletePendingFriend: async (parent, { requestId }, context) => {
      if (context.user._id) {
        //*removes the sent friend request from your pending friends
        const user = User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pendingFriends: requestId } },
          { new: true }
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

    deleteFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const userOne = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendId } },
          { new: true }
        );
        const userTwo = await User.findByIdAndUpdate(
          { _id: friendId },
          { $pull: { friends: context.user._id } },
          { new: true }
        );

        return userOne;
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

        //*putting this on the receiver's model
        const user = await User.findOneAndUpdate(
          { _id: receivingUser },
          { $addToSet: { graffitiPosts: newGraffiti } },
          { new: true }
        );

        return newGraffiti;
      }
    },

    deleteGraffiti: async (parent, { graffitiId }, context) => {
      //*gets the graffiti
      const graffiti = await GraffitiPost.findOne({ id_: graffitiId });

      //*checks to see if the context user is either the original poster of the graffiti, or the person that received the graffiti
      if (
        context.user._id == graffiti.postingUser ||
        context.user._id == graffiti.receivingUser
      ) {
        const deleteGraffiti = await GraffitiPost.findByIdAndDelete({
          _id: graffitiId,
        });
        return deleteGraffiti;
      }
    },

    //*creates a messaging thread with someone
    createMessageThread: async (parent, { recipientId }, context) => {
      //?how to add the users to this
      //?update it
      if (context.user) {
        const newMessageThread = await Message.create({
          chatters: [context.user._id, recipientId],
        });

        const contextUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { messages: newMessageThread._id } }
        );

        const recipientUser = await User.findByIdAndUpdate(
          { _id: recipientId },
          { $addToSet: { messages: newMessageThread._id } }
        );

        return newMessageThread;
      }
    },

    sendMessage: async (parent, { threadId, messageContent }, context) => {
      if (context.user) {
        const sendMessage = await Message.findOneAndUpdate(
          { _id: threadId },
          {
            $addToSet: {
              dm: {
                messageContent: messageContent,
                messageAuthor: context.user._id,
              },
            },
          },
          { new: true }
        );

        return sendMessage;
      }
    },
  },
};

module.exports = resolvers;
