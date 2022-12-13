const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    friends: [String]
    posts: [Post]
    graffitiPosts: [GraffitiPost]
    messages: [Message]
    pendingFriends: [String]
  }

  input MakeUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Post {
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

  type Query {
    allUser: [User]
    user(userId: ID!): User
    userPost(postId: ID!): Post
    userGraffitiPost(userId: ID!): User
    userMessage(userId: ID!): User
    userPendingFriend(userId: ID!): User
    userHomePage(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(firstName: String!
      lastName: String!
      email: String!
      password: String!,)
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
  }
`;

module.exports = typeDefs;
