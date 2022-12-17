import './post.css';
import { MoreVert } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { QUERY_COMMENT_AUTHOR } from '../../context/queries';
import { useQuery } from '@apollo/client';

export default function Comments({ comment }) {
  //console.log('comment', comment.commentAuthor);
  const { loading, data } = useQuery(QUERY_COMMENT_AUTHOR, {
    variables: { userId: comment.commentAuthor },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  //console.log('datadata', data.user);

  return (
    <div>
      <div>{comment.commentText}</div>
      <div>
        {data.user.firstName} {data.user.lastName}
      </div>
    </div>
  );
}
