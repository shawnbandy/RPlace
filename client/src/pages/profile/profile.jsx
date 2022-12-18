import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';
import { ME, QUERY_ALL_USER_POST } from '../../context/queries';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { gql } from "@apollo/client";
// import { ME } from '../src/context/mutations';

function LeftProfile(props) {
    console.log('left prof', props.props)

    return  (
        <>
        <Grid display="flex" justifyContent="space-evenly" container spacing={2}>
            <Grid>
                <img alt="User" src={props.props.profilePicture} height={300} width={300}/>
            </Grid>
            <Grid>
                <Paper>
                    <h3>{props.userName}</h3>
                    <List>
                        <ListItem>
                            <ListItemText primary="Age" secondary={props.props.age} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Status" secondary={props.props.status} />
                        </ListItem>
                    </List>
                </Paper>
            </Grid>
        </Grid>
        <br/>
        <Grid display="flex" justifyContent="space-evenly" container spacing={2}>
            <Grid>
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
                    <p>{props.props.aboutMe}</p>
                </Paper>
            </Grid>
        </Grid>
        </>
    )
}

function RightProfile(props) {
    return(
        <>
        <Grid display="flex" justifyContent="space-evenly" container spacing={2}>
            <Grid>
                <iframe title='Profile IFrame' src={props.webPlugin} height={300} width={150} ></iframe>
            </Grid>
        </Grid>
        <Grid display="flex" justifyContent="space-evenly" container spacing={2}>
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

console.log(QUERY_ALL_USER_POST)

function Posts(props) {
    const { loading, error, data } = useQuery(QUERY_ALL_USER_POST);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    const postArray = data.posts.postText
    const postContent = [postArray]
    console.log(data)
    return(
            postContent.map(postContent => 
            <>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="User Image" src={props.props.profilePicture} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.props.firstName + " " + props.props.lastName}
                        secondary={<React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                            </Typography>
                            {postContent}
                        </React.Fragment>} />
                    </ListItem>
                <Divider variant="inset" component="li" />
            </>
            )
    )
}


// function Media(props) {
//     return <div dangerouslySetInnerHTML={{__html:props.props.mediaContainer}}>
//     </div>
// }

// function Widget(props) {
//     return <div dangerouslySetInnerHTML={{__html:props.props.widgetContainer}}>
//     </div>
// }

export default function Profile() {
    const { loading, error, data } = useQuery(ME);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data.me)
    const profile = data.me.profile
    const posts = data.me.posts
    return (
        <div>
        <Box sx={{ flexGrow: 1 }} style={{"backgroundColor":"#d8e4bc"}}>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <LeftProfile props={profile} />
                </Grid>
                <Grid xs={12} md={6}>
                    <RightProfile props={profile}/>
                </Grid>
            </Grid>
            {/* <Media props={profile}/>
            <Widget props={profile}/> */}
        </Box>
        <Box sx={{ flexGrow: 1 }} style={{"backgroundColor":"#d8e4bc"}}>
            <Grid>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Posts
                        props = {profile}
                    />
                </List>
            </Grid>
        </Box>
        </div>
    )
}