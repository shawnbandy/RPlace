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
} from '../../context/queries';
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';

export default function Feed({ username }) {
  const [allPosts, setAllPosts] = useState([]);
  const yourPostId = useQuery(QUERY_ALL_USER_POST, {
    variables: { userId: AuthService.getProfile().data._id },
  });
  console.log('file: feed.jsx:21 ~ Feed ~ yourPostId', yourPostId);

  const yourData = useQuery(ME);
  console.log('file: feed.jsx:24 ~ Feed ~ yourData', yourData);
  const yourPosts = yourData.data.me.posts;
  console.log('file: feed.jsx:26 ~ Feed ~ yourPosts', yourPosts);
  //console.log('file: feed.jsx:17 ~ Feed ~ you', yourPostId.data.me.friends);

  // console.log('data', data.userAllPost.posts);
  // console.log('auth', AuthService.getProfile().data._id);

  const GetAllPosts = async (e) => {
    //e.preventDefault();
    //*for loop to go through each of your friends and yourself
    //*add your friend's postsId, and postText
    try {
    } catch (err) {
      console.log(err);
    }
  };

  //GetAllPosts();

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {allPosts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
