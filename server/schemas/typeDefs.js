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
    tech: [Tech]
    matchups(_id: String): [Matchup]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup
  }
`;

module.exports = typeDefs;
