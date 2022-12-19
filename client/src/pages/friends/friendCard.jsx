import * as React from 'react';
import { useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery } from '@apollo/client';
import { SEND_PENDING_FRIEND } from '../../context/mutations';

export default function FriendCard({ user }) {
  console.log('user', user);

  const [sendRqst, { err, data }] = useMutation(SEND_PENDING_FRIEND);
  const [disabled, setDisabled] = useState(false);

  const sendFriendRequest = async (e) => {
    e.preventDefault();
    console.log(e.target.id);
    setDisabled(true);

    try {
      const { data } = await sendRqst({
        variables: { receiverId: e.target.id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card sx={{ maxWidth: 600 }} key={user._id}>
        <CardMedia
          component="img"
          height="140"
          // insert profile pic img src
          image="https://cdn.pixabay.com/photo/2020/12/27/20/24/smile-5865208_1280.png"
          alt="user profile picture"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Profile</Button>
        </CardActions>
      </Card>
    </div>
  );
}
