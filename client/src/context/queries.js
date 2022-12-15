import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  {
    allUser {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query getSingleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      email
      firstName
      friends
      graffitiPosts {
        postText
        postingUser
        receivingUser
      }
      lastName
      pendingFriends
      posts {
        postText
        comments {
          commentAuthor
          commentText
        }
      }
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    userPost(postId: $postId) {
      postText
      comments {
        commentAuthor
        commentText
      }
    }
  }
`;

export const QUERY_ALL_USER_GRAFFITI = gql`
  query getAllUserGraffiti($userId: ID!) {
    userGraffitiPost(userId: $userId) {
      graffitiPosts {
        postText
        postingUser
      }
    }
  }
`;

export const QUERY_ALL_USER_MESSAGE = gql`
  query getAllUserMessages($userId: ID!) {
    userMessage(userId: $userId) {
      messages {
        chatters {
          user
        }
        dm {
          messageContent
          messageAuthor
        }
      }
    }
  }
`;

export const QUERY_ALL_USER_PENDING_FRIENDS = gql`
  query getUserPendingFriends($userId: ID!) {
    userPendingFriend(userId: $userId) {
      pendingFriends
    }
  }
`;

export const ME = gql`
  query me {
    me {
      _id
      email
      firstName
      lastName
      profile {
        aboutMe
        backgroundStyling
        details {
          age
          status
        }
        mediaContainer
        profilePicture
        widgetContainer
      }
      friends
      graffitiPosts {
        postText
        postingUser
        receivingUser
      }
      messages {
        chatters {
          user
        }
        dm {
          messageAuthor
          messageContent
        }
      }
      pendingFriends
      posts {
        comments {
          commentText
          commentAuthor
        }
      }
    }
  }
`;
