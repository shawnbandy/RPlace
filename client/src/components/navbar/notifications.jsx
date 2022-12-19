import { ContactSupportOutlined, MoreVert } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER_NAME } from '../../context/queries';
import { DELETE_PENDING_FRIEND, ADD_FRIEND } from '../../context/mutations';
import Typography from '@mui/material/Typography';

export default function Notification({ userId }) {
  const { loading, data } = useQuery(QUERY_SINGLE_USER_NAME, {
    variables: { userId: userId },
  });
  const [deletePending, { err, dData }] = useMutation(DELETE_PENDING_FRIEND);
  const [addFriend, { aErr, aData }] = useMutation(ADD_FRIEND);

  const [disabled, setDisabled] = useState(false);

  if (loading) {
    return <div>loading..</div>;
  }

  console.log(data);

  const denyFriend = async (e) => {
    e.preventDefault();
    console.log(e.target);
    setDisabled(true);
    try {
      const { dData } = await deletePending({
        variables: {
          requestId: e.target.id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const acceptFriend = async (e) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const { aData } = await addFriend({
        variables: {
          requesterId: e.target.id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Typography textAlign="center">
      <span>
        {data.user.firstName} {data.user.lastName}
      </span>
      <button onClick={acceptFriend} id={data.user._id} disabled={disabled}>
        ✅
      </button>
      <button onClick={denyFriend} id={data.user._id} disabled={disabled}>
        ❌
      </button>
    </Typography>
  );
}
