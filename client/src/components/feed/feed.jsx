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
  const { friendLoading, friendData } = useQuery(QUERY_ALL_FRIENDS_POST);

  if (loading || friendLoading) {
    return <div>Loading...</div>;
  }

  console.log(data.userAllPost.posts);
  console.log('friendData', friendData);

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
