import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { useMutation, useQuery } from '@apollo/client';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ME } from '../../context/queries';
import { colors } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import { ME } from '../src/context/mutations';

function UserPosts() {
    const { loading, error, data } = useQuery(ME);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <select name='user_posts'>
      {data.me.posts.map((user_posts) => (
        <option key={user_posts._id} value={user_posts.postText}>
          {user_posts.postText}
        </option>
      ))}
    </select>
  );
};

console.log(UserPosts());

function LeftProfile(props) {

    return  (
        <>
        <Grid container spacing={2}>
            <Grid xs={12} md={4}>
                <img alt="User" src={props.props.me.profile.profilePicture} />
            </Grid>
            <br />
            <Grid xs={12} md={8}>
                <Paper>
                    <h3>{props.userName}</h3>
                    <List>
                        <ListItem>
                            <ListItemText primary="Age" secondary={props.props.me.profile.details.age} />
                        </ListItem>
                        {/* <ListItem>
                            <ListItemText primary="Height" secondary={props.props.me.profile.details.height} />
                        </ListItem> */}
                        <ListItem>
                            <ListItemText primary="Status" secondary={props.props.me.profile.details.status} />
                        </ListItem>
                    </List>
                </Paper>
            </Grid>
        </Grid>
        <br/>
        <Grid container spacing={2}>
            <Grid>
                <Paper>
                    <h6>Last Login: {props.userLogin}</h6>
                </Paper>
                <br/>
                <Paper>
                    <h6>Top Friends:</h6>
                    <ol>
                        <li>{props.firstFriend}</li>
                        <li>{props.secondFriend}</li>
                        <li>{props.thirdFriend}</li>
                    </ol>
                </Paper>
                <br/>
                <Paper>
                    <h6>About Me:</h6>
                    <p>{props.props.me.profile.aboutMe}</p>
                </Paper>
            </Grid>
        </Grid>
        </>
    )
}

function RightProfile(props) {
    return(
        <>
        <Grid container spacing={2}>
            <Grid>
                <iframe title='Profile IFrame' src={props.webPlugin} height={1000} width={500} ></iframe>
            </Grid>
            <Grid>
                <Paper>
                    <h6>Wall Graffiti!</h6>
                    <br/>
                    <List>
                        <ListItem>{props.graffiti1}</ListItem>
                        <ListItem>{props.graffiti2}</ListItem>
                        <ListItem>{props.graffiti3}</ListItem>
                    </List>
                </Paper>
            </Grid>
        </Grid>
        </>
    )
}

// function Posts(props) {
//     return(
//         <>
//         <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
//             <ListItem alignItems="flex-start">
//                 <ListItemAvatar>
//                 <Avatar alt="User Image" src={props.props.me.profile.profilePicture} />
//                 </ListItemAvatar>
//                 <ListItemText
//                 primary={props.userName}
//                 secondary={
//                     <React.Fragment>
//                     <Typography
//                         sx={{ display: 'inline' }}
//                         component="span"
//                         variant="body2"
//                         color="text.primary"
//                     >
//                         Ali Connors
//                     </Typography>
//                     {props.userPost}
//                     </React.Fragment>
//                 }
//                 />
//             </ListItem>
//             <Divider variant="inset" component="li" />
//         </List>
//         </>
//     )
// }

function Media(props) {
    console.log(props.props.me.profile.mediaContainer)
    return <div dangerouslySetInnerHTML={{__html:props.props.me.profile.mediaContainer}}>
    </div>
}

function Widget(props) {
    console.log(props.props.me.profile.widgetContainer)
    return <div dangerouslySetInnerHTML={{__html:props.props.me.profile.widgetContainer}}>
    </div>
}

export default function Profile() {
    const { loading, error, data } = useQuery(ME);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data)
    console.log(data.me.profile.backgroundStyling)
    return (
        <div>
        <Box sx={{ flexGrow: 1 }} style={{"backgroundColor":"blue"}}>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <LeftProfile props={data} />
                </Grid>
                <Grid xs={12} md={6}>
                    <RightProfile props={data}/>
                </Grid>
            </Grid>
            <Media props={data}/>
            <Widget props={data}/>
        </Box>
        </div>
    )
}