import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MenuIcon from '@mui/icons-material/Menu';

function Friends(props) {
    return (
        <>
        <ListItem alignItems='flex-start'>
            <ListItemAvatar>
                <Avatar alt={props.name} src={props.avatar} />
            </ListItemAvatar>
            <ListItemText
                primary={props.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component='span'
                            variant='body2'
                            color='text.primary'
                        >
                            to {props.user}
                        </Typography>
                        {" - "}{props.message}
                    </React.Fragment>
                }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
        </>
    )
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
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Friends
            name=''
            avatar=''
            user=''
            message=''
        />
        <Friends
            name=''
            avatar=''
            user=''
            message=''
        />
        <Friends
            name=''
            avatar=''
            user=''
            message=''
        />
        <Friends
            name=''
            avatar=''
            user=''
            message=''
        />
        <Friends
            name=''
            avatar=''
            user=''
            message=''
        />
        <Friends
            name=''
            avatar=''
            user=''
            message=''
        />
        <Friends
            name=''
            avatar=''
            user=''
            message=''
        />
        <Friends
            name=''
            avatar=''
            user=''
            message=''
        />
        <Friends
            name=''
            avatar=''
            user=''
            message=''
        />
        <Friends
            name=''
            avatar=''
            user=''
            message=''
        />
      </List>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default RightBar;