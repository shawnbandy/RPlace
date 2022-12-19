import './post.css';
import { MoreVert } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../context/mutations';
import Comments from './comments';
import { useQuery } from '@apollo/client';
import { ME, QUERY_ALL_USER_POST } from '../../context/queries';
import AuthService from '../../context/auth';

import { Users } from '../../dummyData';


// A function I worked on to pull the user image from the logged in profile

// function UserImage() {
//   const { loading, error, data } = useQuery(ME, {
//     variables: { userId: AuthService.getProfile().data._id },
//   });
//   if (loading) return 'Loading...';
//   if (error) return `Error! ${error.message}`;
//   console.log(data)
//   const profilePicture = data.me.profile.profilePicture
//   return data.me.profile.profilePicture;
// }

export default function Post({ post }) {
  //console.log('post in js', post);
  //!expecting the following: comment, date, desc, id, link, photo, userId

  const [comment, setComment] = useState({
    commentText: '',
  });

  const [addComment, { err, data }] = useMutation(ADD_COMMENT);

  const submitComment = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    console.log('working');

    try {
      console.log('comment', comment);
      const { data } = await addComment({
        variables: {
          postId: e.target.id,
          commentText: comment.commentText,
        },
      });
      setComment({ commentText: '' });
    } catch (err) {
      console.log(err);
    }
  };

  const showCommentForm = (e) => {};

  //!this is supposed to hide the comment box and button, but when you click on the '0 comment' span on line 87, it's supposed to show the submit form
  const commentInput = {
    visibility: 'hidden', //???????
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  return (
    <div className="post" id={post._id}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              // src={Users.filter((u) => u.id === post.userId)[0].profilePicture}
              alt=''
            />
            <span className="postUsername">
              {/* {Users.filter((u) => u.id === post.userId)[0].username} */}
            </span>
            {/* <span className="postDate">{post.date}</span> */}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.postText}</span>
          {/* <img className="postImg" src={post.photo} alt="" /> */}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt="" />

            <img className="likeIcon" src="assets/heart.png" alt="" />
            <span className="postLikeCounter">
              {/* {post.like} people liked this! */}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={showCommentForm}>
              {post.comments.length} Comments
            </span>
            <div className="">
              <input
                placeholder="Comment here"
                className="commentInput"
                type="text"
                name="commentText"
                value={comment.commentText}
                onChange={handleChange}></input>
              <button className="postButton" onClick={submitComment} id={post._id}>
                Send
              </button>
              <div className='commentPosts'>
                {post.comments.map((c) => (
                  <Comments key={c._id} comment={c}/>
                  
                ))}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}