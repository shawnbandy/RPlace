import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { useMutation, useQuery } from '@apollo/client';
import { ME } from '../../context/queries';
import { colors } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import { ME } from '../src/context/mutations';
import NavbarComponent from "../../components/navbar/navbar";

function LeftProfile(props) {
    console.log('left prof', props.props)

    return  (
        <>
        <Grid container spacing={2}>
            <Grid xs={12} md={4}>
                <img alt="User" src={props.props.profilePicture} />
            </Grid>
            <br />
            <Grid xs={12} md={8}>
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

function Posts(props) {
    const postContent = props.props.posttext
    return(
        <>
            {postContent.map(postContent => 
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
            )}
        </>
    )
}


function Media(props) {
    return <div dangerouslySetInnerHTML={{__html:props.props.mediaContainer}}>
    </div>
}

function Widget(props) {
    return <div dangerouslySetInnerHTML={{__html:props.props.widgetContainer}}>
    </div>
}

export default function ProfilePage() {
    const { loading, error, data } = useQuery(ME);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data.me.profile)
    const profile = data.me.profile
    const posts = data.me.posts
    return (
        <div>
        <NavbarComponent />
        <Box sx={{ flexGrow: 1 }} style={{"backgroundColor":"blue"}}>
            <Grid container spacing={2}>
                <Grid xs={12} md={6}>
                    <LeftProfile props={profile} />
                </Grid>
                <Grid xs={12} md={6}>
                    <RightProfile props={profile}/>
                </Grid>
            </Grid>
            <Media props={profile}/>
            <Widget props={profile}/>
        </Box>
        <Box sx={{ flexGrow: 1 }} style={{"backgroundColor":"blue"}}>
            <Grid>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Posts
                        props = {posts && profile}
                    />
                </List>
            </Grid>
        </Box>
        </div>
    )
}