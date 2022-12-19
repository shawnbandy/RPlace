import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthService from '../../context/auth';

import Navbar from '../../components/navbar/navbar';
import FriendCard from './friendCard';
import '../search/search.css';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ALL_FRIENDS } from '../../context/queries';
import { useParams } from 'react-router-dom';

export default function Friend() {
  let { q } = useParams();
  console.log(q);

  const { loading, error, data } = useQuery(QUERY_ALL_FRIENDS, {
    variables: { userId: AuthService.getProfile().data._id },
  });

  console.log(data);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log('SEARCH USER DATA RETURN: ', data.userHomePage.friends);

  return (
    <div className="searchContainer">
      {data.userHomePage.friends.map((user) => (
        <FriendCard key={user._id} user={user} />
      ))}
    </div>
  );
}
