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
// import { ME } from '../src/context/mutations';
//client/src/context/queries.js

function LeftProfile(props) {

    return  (
        <>
        <Grid container spacing={2}>
            <Grid xs={12} md={4}>
                <img alt="User" src={props.profilePic} />
            </Grid>
            <br />
            <Grid xs={12} md={8}>
                <Paper>
                    <h3>{props.userName}</h3>
                    <List>
                        <ListItem>
                            <ListItemText primary="Age" secondary={props.userAge} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Height" secondary={props.userHeight} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Status" secondary={props.userRelationship} />
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
                    <p>{props.userAbout}</p>
                </Paper>
            </Grid>
        </Grid>
        </>
    )
}

function RightProfile(props) {
    return(
        <>
        
        </>
    )
}

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

export default function ProfilePage() {
    const { loading, error, data } = useQuery(ME);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
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
        </>
    )
}