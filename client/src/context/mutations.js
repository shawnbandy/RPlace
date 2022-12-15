import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
mutation AddComment(
    $postId: String!,
    $commentText: String!
    ) {
    addComment(
        postId: $postId,
        commentText: $commentText
        ) {
    }
  }
`;

export const ADD_FRIEND = gql`
mutation AddComment(
    $postId: String!,
    $commentText: String!,
    $requesterId: String!
    ) {
    addComment(
        postId: $postId,
        commentText: $commentText
        ) {
    }
    addFriend(
        requesterId: $requesterId
        ) {
    }
  }
`;

export const ADD_GRAFFITI = gql`
mutation AddGraffiti(
    $receivingUser: String!,
    $postText: String!
    ) {
    addGraffiti(
        receivingUser: $receivingUser,
        postText: $postText
        ) {
    }
  }
`;

export const ADD_POST = gql`
mutation AddPost(
    $postText: String!
    ) {
    addPost(
        postText: $postText
        ) {
    }
  }
`;

export const ADD_USER = gql`
mutation AddUser(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!
    ) {
    addUser(
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password
        ) {
    }
  }  
`;

export const CREATE_MESSAGE_THREAD = gql`
mutation CreateMessageThread(
    $recipientId: String!
    ) {
    createMessageThread(
        recipientId: $recipientId
        ) {
    }
  }
`;

export const DELETE_COMMENT = gql`
mutation DeleteComment(
    $postId: String!,
    $commentId: String!
    ) {
    deleteComment(
        postId: $postId,
        commentId: $commentId
        ) {
    }
  }
`;

export const DELETE_FRIEND = gql`
mutation DeleteFriend(
    $friendId: String!
    ) {
    deleteFriend(
        friendId: $friendId
        ) {
    }
  }
`;

export const DELETE_GRAFFITI = gql`
mutation DeleteGraffiti(
    $graffitiId: String!
    ) {
    deleteGraffiti(
        graffitiId: $graffitiId
        ) {
    }
  }
`;

export const DELETE_PENDING_FRIEND = gql`
mutation DeletePendingFriend(
    $requestId: String!
    ) {
    deletePendingFriend(
        requestId: $requestId
        ) {
    }
  }
`;

export const DELETE_POST = gql`
mutation DeletePost(
    $postId: String!
    ) {
    deletePost(
        postId: $postId
        ) {
    }
  }
`;

export const DELETE_USER = gql`
mutation DeleteUser {
    deleteUser {
    }
  }
`;

export const LOGIN = gql`
mutation Login(
    $email: String!,
    $password: String!
    ) {
    login(
        email: $email,
        password: $password
        ) {
    }
  }
`;

export const SEND_MESSAGE = gql`
mutation SendMessage(
    $threadId: String!,
    $messageContent: String!
    ) {
    sendMessage(
        threadId: $threadId,
        messageContent: $messageContent
        ) {
    }
  }
`;

export const SEND_PENDING_FRIEND = gql`
mutation SendPendingFriend(
    $receiverId: String!
    ) {
    sendPendingFriend(
        receiverId: $receiverId
        ) {
    }
  }
`;

export const UPDATE_USER = gql`
mutation UpdateUser(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!
    ) {
    updateUser(
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password
        ) {
    }
  }
`;