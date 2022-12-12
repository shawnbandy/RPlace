const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    friends: [String]
    posts: [Post]!
    graffitiPosts: [GraffitiPost]!
    messages: [Message]!
    pendingFriends: [String]
  }

  input MakeUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  ##is this right with the comments?
  type Post {
    postText: String!
    comments: [String]
  }

  type GraffitiPost {
    postingUser: String!
    receivingUser: String!
    postText: String!
  }

  type Message {
    chatters: [String]
    dm: [String]
  }

  type Query {
    user(userId: ID!): User
    userPost(userId: ID!): User
    userGraffitiPost(userId: ID!): User
    userMessage(userId: ID!): User
    userPendingFriend(userId: ID!): User
    me: User
  }

  type Mutation {
    addPost(postText: String!): Post
    addComment(postId: String!, commentText: String!): Post
    sendPendingFriend(receiverId: String!): User
    addFriend(requesterId: String!): User
    addGraffiti(receivingUser: String!, postText: String!): GraffitiPost
    createMessageThread(recipientId: String!): Message
    sendMessage(threadId: String!, messageContent: String!): Message
  }
`;

module.exports = typeDefs;
