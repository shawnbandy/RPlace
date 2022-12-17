import './share.css';
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';
import { useMutation } from '@apollo/client';
import AuthService from '../../context/auth';
import React, { useState } from 'react';
import { ADD_POST } from '../../context/mutations';

export default function Share() {
  const [post, setPost] = useState({ text: '' });
  const [addPost, { error, data }] = useMutation(ADD_POST);

  //console.log('logged in', AuthService.loggedIn());

  const submitPost = async (e) => {
    e.preventDefault();

    if (!post.current.value) {
      console.log('Please make a post');
      return;
    }

    try {
      console.log('posting...');
      const { data } = await addPost({
        variables: {
          postText: post.text,
        },
      });
      console.log('postdata', data);
      setPost({ text: '' });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="assets/propic.jpg" alt="" />
          <input
            placeholder="What do you wanna post?"
            className="shareInput"
            type="text"
            name="text"
            ref={post}
            value={post.text}
            onChange={handleChange}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="red" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="orange" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
        </div>
        <button className="shareButton" onClick={submitPost}>
          Share
        </button>
      </div>
    </div>
  );
}
