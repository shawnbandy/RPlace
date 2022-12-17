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
  query User($userId: ID!) {
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

export const QUERY_FIND_USERS = gql`
  query FindFriend($lastName: String!, $firstName: String!) {
    findFriend(lastName: $lastName, firstName: $firstName) {
      _id
      firstName
      lastName
    }
  }
`;

export const QUERY_COMMENT_AUTHOR = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      firstName
      lastName
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

export const QUERY_ALL_FRIENDS_POST = gql`
  query Me {
    me {
      friends {
        posts {
          _id
          postText
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

export const QUERY_ALL_USER_POST = gql`
  query UserAllPost($userId: ID!) {
    userAllPost(userId: $userId) {
      _id
      posts {
        _id
        postText
        comments {
          commentAuthor
          commentText
        }
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      _id
      email
      firstName
      lastName
      friends {
        _id
        posts {
          _id
          postText
          comments {
            commentAuthor
          }
        }
      }
      graffitiPosts {
        postText
        postingUser
        receivingUser
      }
      pendingFriends
      posts {
        _id
        postText
        comments {
          commentAuthor
        }
      }
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
    }
  }
`;
