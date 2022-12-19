import * as React from 'react';
import './profile.css';
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
import AuthService from '../../context/auth';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
//import Feed from '../../components/feed/feed';

// import { ME } from '../src/context/mutations';

function LeftProfile(props) {
  return (
    <>
      <Grid container display="flex" justifyContent="center" spacing={1}>
        <Grid sm={12}>
          <Avatar
            alt="User"
            className="profilepic"
            src={props.props.profilePicture}
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
        <Grid sm={12}>
          <Box>
            <h1>{props.userName}</h1>
            <List>
              <Divider />
              <ListItem>
                <ListItemText primary="Age" secondary={props.props.age} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Status" secondary={props.props.status} />
              </ListItem>
              <Divider />
            </List>
          </Box>
        </Grid>
      </Grid>
      <br />
      <Grid display="flex" justifyContent="space-evenly" container spacing={2}>
        <Grid sm={12}>
          <Box>
            <h2>Top Friends:</h2>
            <ol>
              <li>{props.props.friend1}</li>
              <li>{props.props.friend2}</li>
              <li>{props.props.friend3}</li>
              <Divider />
            </ol>
          </Box>
          <br />
          <Box>
            <h2>About Me:</h2>
            <p>{props.props.aboutMe}</p>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

function RightProfile(props) {
  return (
    <>
      <Grid display="flex" justifyContent="space-evenly" container spacing={2}>
        <Grid>
          <Paper>
            <h6>Wall Graffiti!</h6>
            <br />
            <List>
              <ListItem>{props.graffiti1}</ListItem>
              <ListItem>{props.graffiti2}</ListItem>
              <ListItem>{props.graffiti3}</ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

function Post(props) {
  // const postArray = props.props.postText;
  const postContent = [];
  const { loading, data } = useQuery(QUERY_ALL_USER_POST, {
    variables: { userId: AuthService.getProfile().data._id },
  });

  return <div>GRAFFITI</div>;
  return data.userAllPost.posts.map((postContent) => (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="User Image"
            src={props.props.profilePicture}
            sx={{ width: 75, height: 75 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={props.userName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"></Typography>
              {props.postContent}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  ));
}

function Feed(props) {
  // const postArray = props.props.postText;
  const postContent = [];
  const { loading, data } = useQuery(QUERY_ALL_USER_POST, {
    variables: { userId: AuthService.getProfile().data._id },
  });
  const { loading: meLoad, data: meData } = useQuery(ME, {
    variables: { userId: AuthService.getProfile().data._id },
  });

  if (loading || meLoad) {
    return <div>Loading...</div>;
  }
  console.log('data???', meData);
  return (
    <div>
      <h3>
        {meData.me.firstName} {meData.me.lastName}'s Posts
      </h3>
      {data.userAllPost.posts.map((postContent) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemText
              primary={postContent.postText}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"></Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </div>
  );
}

function PostStatus() {
  return <></>;
}

function Media(props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: props.props.mediaContainer }}></div>
  );
}

function Widget(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.props.widgetContainer }}></div>
  );
}

function RightBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}></Box>
  );

  const { loading, error, data } = useQuery(ME, {
    variables: { userId: AuthService.getProfile().data._id },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data.me.firstName);
  const profile = data.me.profile;

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}>
            <ListItem>
              <Media props={profile} />
            </ListItem>
            <Divider />
            <ListItem>
              <Widget props={profile} />
            </ListItem>
            <Divider />
            <ListItem>
              <RightProfile props={profile} />
            </ListItem>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Profile() {
  const { loading, error, data } = useQuery(ME, {
    variables: { userId: AuthService.getProfile().data._id },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log(data.me.firstName);
  const profile = data.me.profile;
  return (
    <div className="profile">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16} sx={{ bgcolor: '#BDB5D5' }}>
          <Grid xs={16} md={3} sx={{ borderRight: '1px solid black' }}>
            <LeftProfile
              props={profile}
              userName={data.me.firstName + ' ' + data.me.lastName}
            />
          </Grid>
          <Grid xs={16} md={13} sx={{ padding: '13px' }}>
            <Post />

            <Feed />
            
            <Media props={profile}/>
              
            <Widget props={profile}/>

          </Grid>
          <RightBar />
        </Grid>
      </Box>
    </div>
  );
}
