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
  const { loading, data } = useQuery(QUERY_ALL_USER_POST, {
    variables: { userId: AuthService.getProfile().data._id },
  });
  const { loading: friendLoading, data: friendData } = useQuery(
    QUERY_ALL_FRIENDS_POST,
    {
      variables: { userId: AuthService.getProfile().data._id },
    }
  );

  console.log(friendLoading);
  if (loading || friendLoading) {
    return <div>Loading...</div>;
  }

  const putAllPost = (arr) => {
    let objArr = [];
    console.log('arr', arr);
    for (let i = 0; i < arr.length; i++) {
      console.log('arrI', arr[i]);
      for (let j = 0; j < 4; j++) {
        console.log('arrJ', arr[i].posts[j]);
        objArr.push({
          _id: arr[i].posts[j]._id,
          postText: arr[i].posts[j].postText,
        });
      }
    }
    return objArr;
  };

  //let testArr = putAllPost(friendData.userFriendPost.friends);
  //console.log('file: feed.jsx:54 ~ Feed ~ testArr', testArr);
  //console.log('friendData', friendData.userFriendPost.friends);

  console.log(allPosts);

  //console.log(data.userAllPost.posts);
  //console.log('friendData', friendData);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {data.userAllPost.posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
