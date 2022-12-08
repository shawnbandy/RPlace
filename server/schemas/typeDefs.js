const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    posts: [Post]!
    profile_Posts: [ProPagePosts]!
    comments: [Post_Comment]!
  }

  type Post {
    _id: ID!
    userId: String!
    postText: String!
    comments: [Post_Comment]!
  }

  type Comment {
    _id: ID!
    userId: String!
    postText: String!
  }

  type ProPagePost {
    _id: ID!
    postingUser: String!
    receivingUser: String!
    postText: String!
  }

  type Friend {
    _id: ID!
    friendId: String!
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
