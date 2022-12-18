import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Navbar from "../../components/navbar/navbar";
import "./search.css"
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_FIND_USERS } from '../../context/queries';
import { useParams } from 'react-router-dom'

export default function Search() {
  let {q} = useParams();
  console.log(q)
    // todo replace hard coded varibles with useParams()
    // todo replace button functions
    const { loading, error, data } = useQuery(QUERY_FIND_USERS, {variables: {"firstName":"Mac", "lastName": "Greene"}});
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log("SEARCH USER DATA RETURN: ", data)

  return <div className="searchContainer">
  <Navbar/>
  {data.findFriend.map((user)=>{
    return (
    <Card sx={{ maxWidth: 600 }} key={user._id}>
    <CardMedia
      component="img"
      height="140"
      // insert profile pic img src
      image={user.profile.profilePicture}
      alt="user profile picture"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {user.firstName} {user.lastName} 
      </Typography>
      <Typography variant="body2" color="text.secondary">
      {user.profile.aboutMe}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Add Friend</Button>
      <Button size="small">View Profile</Button>
    </CardActions>
  </Card>
    )
  })}

  </div>

}
