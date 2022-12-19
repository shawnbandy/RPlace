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
      console.log("backend user");
      return await User.findOne({ _id: userId });
    },
    //*gets all of the user's posts/comments
    userPost: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    userAllPost: async (parent, { userId }, context) => {
      console.log("backendAllPost");
      return User.findOne({ _id: userId }).populate("posts");
    },

    userFriendPost: async (parent, { userId }) => {
      console.log("userfriendpost");

      try {
        const user = await User.findOne({ _id: userId })
          .populate("friends")
          .populate("posts");
        console.log("user", user);
        console.log("returning");
        return user;
      } catch (err) {
        console.log(err);
      }
    },
    findFriend: async (parent, { firstName, lastName }, context) => {
      const user = User.find({ firstName: firstName, lastName: lastName });
      console.log(user);
      return user;
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
      try {
        const user = await User.findOne({ _id: context.user._id });
        console.log("user ", user);
        return user;
      } catch {
        throw new AuthenticationError("You need to be logged in!");
      }
    },
  },

  Mutation: {
    addUser: async (parent, { email, firstName, lastName, password }) => {
      console.log("backend user");
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
      console.log("loginResolve", email, password);
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Email address not found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect email/password");
      }

      const token = signToken(user);
      console.log("file: resolvers.js:134 ~ login: ~ token", token);

      return { token, user };
    },

    addPost: async (parent, { postText }, context) => {
      console.log("backendaddPost");
      console.log(context.user);
      console.log(postText);

      if (context.user) {
        const newPost = await Post.create({
          userId: context.user._id,
          postText: postText,
        });

        console.log("newpost", newPost);

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: newPost._id } },
          { new: true }
        );

        //console.log('user', user);

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
      console.log("backend sendPend");
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
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pendingFriends: requestId } },
          { new: true }
        );
        return user;
      }
    },

    //*accept a friend= add them to the friend array, remove them from the pending friend request
    addFriend: async (parent, { requesterId }, context) => {
      console.log("add Friend Backend");
      console.log(requesterId);
      console.log(context.user._id);
      if (context.user) {
        const requester = await User.findOne({ _id: requesterId });

        const userRemove = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { pendingFriends: requester._id } },
          { new: true }
        );

        const userAdd = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: requester } },
          { new: true }
        );

        return userAdd;
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

    // todo revise resolver to only update defined variables
    UpdateProfileSettings: async (
      parent,
      {
        profilePicture,
        aboutMe,
        age,
        status,
        friend1,
        friend2,
        friend3,
        mediaContainer,
        widgetContainer,
      },
      context
    ) => {
      const user = await User.findOne({ _id: context.user._id });
      const profile = user.profile;

      const profilePictureCurrent = profile.profilePicture;
      const aboutMeCurrent = profile.aboutMe;
      const ageCurrent = profile.age;
      const statusCurrent = profile.status;
      const friend1Current = profile.friend1;
      const friend2Current = profile.friend2;
      const friend3Current = profile.friend3;
      const mediaContainerCurrent = profile.mediaContainer;
      const widgetContainerCurrent = profile.widgetContainer;

      console.log("age current", ageCurrent);
      console.log("aboutMe current", aboutMeCurrent);
      console.log("mediaContainerCurrent  current", mediaContainerCurrent);
      console.log("widgetContainerCurrent  current", widgetContainerCurrent);

      if (profilePicture === null || profilePicture === undefined) {
        profilePicture = profilePictureCurrent;
      }
      if (aboutMe === null || aboutMe === undefined) {
        aboutMe = aboutMeCurrent;
      }
      if (age === null || age === undefined) {
        age = ageCurrent;
      }
      if (status === null || status === undefined) {
        status = statusCurrent;
      }
      if (friend1 === null || friend1 === undefined) {
        friend1 = friend1Current;
      }
      if (friend2 === null || friend2 === undefined) {
        friend2 = friend2Current;
      }
      if (friend3 === null || friend3 === undefined) {
        friend3 = friend3Current;
      }
      if (mediaContainer === null || mediaContainer === undefined) {
        mediaContainer = mediaContainerCurrent;
      }
      if (widgetContainer === null || widgetContainer === undefined) {
        widgetContainer = widgetContainerCurrent;
      }

      console.log("age new", age);
      console.log("aboutMe ", aboutMe);
      console.log("mediaContainerCurrent ", mediaContainer);
      console.log("widgetContainerCurrent ", widgetContainer);

      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            profile: {
              profilePicture: profilePicture,
              aboutMe: aboutMe,
              age: age,
              status: status,
              friend1: friend1,
              friend2: friend2,
              friend3: friend3,
              mediaContainer: mediaContainer,
              widgetContainer: widgetContainer,
            },
          },
          { new: true }
        );
        return updatedUser.profile;
      }
    },
  },
};

module.exports = resolvers;
