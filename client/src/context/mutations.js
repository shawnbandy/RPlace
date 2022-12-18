import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation AddComment($postId: String!, $commentText: String!) {
    addComment(postId: $postId, commentText: $commentText) {
      comments {
        commentAuthor
        commentText
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation AddFriend($requesterId: String!) {
    addFriend(requesterId: $requesterId) {
      _id
    }
  }
`;

export const ADD_GRAFFITI = gql`
  mutation AddGraffiti($receivingUser: String!, $postText: String!) {
    addGraffiti(receivingUser: $receivingUser, postText: $postText) {
      postText
      postingUser
      receivingUser
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($postText: String!) {
    addPost(postText: $postText) {
      postText
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    addUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_MESSAGE_THREAD = gql`
  mutation CreateMessageThread($recipientId: String!) {
    createMessageThread(recipientId: $recipientId) {
      chatters {
        user
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: String!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      comments {
        commentAuthor
      }
    }
  }
`;

export const DELETE_FRIEND = gql`
  mutation DeleteFriend($friendId: String!) {
    deleteFriend(friendId: $friendId) {
      _id
    }
  }
`;

export const DELETE_GRAFFITI = gql`
  mutation DeleteGraffiti($graffitiId: String!) {
    deleteGraffiti(graffitiId: $graffitiId) {
      receivingUser
    }
  }
`;

export const DELETE_PENDING_FRIEND = gql`
  mutation DeletePendingFriend($requestId: String!) {
    deletePendingFriend(requestId: $requestId) {
      _id
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      _id
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        password
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($threadId: String!, $messageContent: String!) {
    sendMessage(threadId: $threadId, messageContent: $messageContent)
    dm {
      messageAuthor
      messageContent
    }
  }
`;

export const SEND_PENDING_FRIEND = gql`
  mutation SendPendingFriend($receiverId: String!) {
    sendPendingFriend(receiverId: $receiverId) {
      _id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      firstName
      lastName
      email
      password
    }
  }
`;

// todo updaste mutation to only accept defined varirables from settings form submit
export const UPDATE_PROFILE_SETTINGS = gql`
  mutation UpdateProfileSettings(
    $age: String
    $aboutMe: String
    $status: String
    $mediaContainer: String
    $widgetContainer: String
    $profilePicture: String
  ) {
    UpdateProfileSettings(
      age: $age
      aboutMe: $aboutMe
      status: $status
      mediaContainer: $mediaContainer
      widgetContainer: $widgetContainer
      profilePicture: $profilePicture
    ) {
      aboutMe
      age
      backgroundStyling
      profilePicture
      mediaContainer
      status
      widgetContainer
    }
  }
`;
