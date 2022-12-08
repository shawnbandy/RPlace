const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    Password: String!
    Posts: [Post]!
    Profile_Posts: [ProPagePosts]!
    Comments: [Post_Comment]!
  }

  type Post {
    _id: ID!
    UserId: User! 
    Body: String!
    Comments: [Post_Comment]!
  }

  type ProPagePost {
    _id: ID!
    Body: String!
  }

  type Post_Comment {
    _id: ID!
    Body: String!
  }

  type Friends {

  }

  type Matchup {
    _id: ID!
    tech1: String!
    tech2: String!
    tech1_votes: Int
    tech2_votes: Int
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
