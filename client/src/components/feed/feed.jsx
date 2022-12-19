import Post from '../post/post';
import Share from '../share/share';
import './feed.css';
import { Posts } from '../../dummyData';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import AuthService from '../../context/auth';
import {
  ME,
  QUERY_SINGLE_USER,
  QUERY_ALL_USER_POST,
  QUERY_SINGLE_POST,
  QUERY_ALL_FRIENDS_POST,
} from '../../context/queries';
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';

export default function Feed({ username }) {
  const [allPosts, setAllPosts] = useState([]);
  const [testPosts, setTestPosts] = useState([]);
  // const { loading, data: yourData } = useQuery(QUERY_ALL_USER_POST, {
  //   variables: { userId: AuthService.getProfile().data._id },
  // });
  const { loading: friendLoading, data: friendData } = useQuery(
    QUERY_ALL_FRIENDS_POST,
    {
      variables: { userId: AuthService.getProfile().data._id },
    }
  );

  //console.log(friendLoading);
  if (friendLoading) {
    return <div>Loading...</div>;
  }

  let testArr = [];
  //console.log('file: feed.jsx:22 ~ Feed ~ data', yourData);
  // if (friendData.userFriendPost.friends) {
  //   testArr = putAllPost(friendData.userFriendPost.friends);
  // }

  //console.log('file: feed.jsx:54 ~ Feed ~ testArr', testArr);
  //console.log('friendData', friendData.userFriendPost.friends);

  console.log(friendData.userFriendPost);

  //console.log(data.userAllPost.posts);
  //console.log('friendData', friendData);

  const noFriends = () => {
    return (
      <div>
        <h1>get some friends. lol</h1>
      </div>
    );
  };

  const someFriends = (array) => {
    console.log('----------------', array);
    let shuffled = array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffled.map((p) => <Post key={p._id} post={p} />);
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {friendData.userFriendPost
          ? someFriends(friendData.userFriendPost)
          : noFriends()}
      </div>
    </div>
  );
}
