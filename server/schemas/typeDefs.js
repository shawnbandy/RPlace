const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    friends: [User]
    posts: [Post]
    profile: Profile
    graffitiPosts: [GraffitiPost]
    messages: [Message]
    pendingFriends: [String]
  }

  type Profile {
    backgroundStyling: String
    profilePicture: String
    aboutMe: String
    age: String
    status: String
    friend1: String
    friend2: String
    friend3: String
    mediaContainer: String
    widgetContainer: String
  }

  input MakeUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Post {
    _id: ID!
    postText: String
    comments: [Comment]
  }

  type Comment {
    commentText: String!
    commentAuthor: String!
  }

  type GraffitiPost {
    postingUser: String!
    receivingUser: String!
    postText: String!
  }

  type Message {
    chatters: [Chatter]
    dm: [DM]
  }

  type Chatter {
    user: String!
  }

  type DM {
    messageContent: String!
    messageAuthor: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type fuck {
    _id: ID!
    firstName: String
    lastName: String
    postText: String
    comments: [Comment]
  }

  type Query {
    allUser: [User]
    user(userId: ID!): User
    userPost(postId: ID!): Post
    userGraffitiPost(userId: ID!): User
    userMessage(userId: ID!): User
    userPendingFriend(userId: ID!): User
    userHomePage(userId: ID!): User
    me: User
    userAllPost(userId: ID!): User
    userFriendPost(userId: ID!): [fuck]
    userFriendPage(userId: ID!): User
    findFriend(firstName: String!, lastName: String!): [User]
  }

  type Mutation {
    addUser(
      email: String!
      firstName: String!
      lastName: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    login(email: String!, password: String!): Auth
    addPost(postText: String!): Post
    addComment(postId: String!, commentText: String!): Post
    addFriend(requesterId: String!): User
    addGraffiti(receivingUser: String!, postText: String!): GraffitiPost
    createMessageThread(recipientId: String!): Message
    sendMessage(threadId: String!, messageContent: String!): Message
    sendPendingFriend(receiverId: String!): User
    deleteUser: User
    deletePost(postId: String!): User
    deleteComment(postId: String!, commentId: String!): Post
    deletePendingFriend(requestId: String!): User
    deleteFriend(friendId: String!): User
    deleteGraffiti(graffitiId: String!): GraffitiPost
    UpdateProfileSettings(
      profilePicture: String
      aboutMe: String
      age: String
      status: String
      friend1: String
      friend2: String
      friend3: String
      mediaContainer: String
      widgetContainer: String
    ): Profile
  }
`;

module.exports = typeDefs;
