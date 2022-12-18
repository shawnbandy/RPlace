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
        </div>
    )
}