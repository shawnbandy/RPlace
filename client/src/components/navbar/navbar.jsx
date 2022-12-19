import './navbar.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  QUERY_FIND_USERS,
  QUERY_ALL_USER_PENDING_FRIENDS,
} from '../../context/queries';
import SearchFriend from '../friends/searchFriends';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import AuthService from '../../context/auth';
import Notification from './notifications';

import { NavLink } from 'react-router-dom';

// Sets styling for the search bar inside of the Navbar (the example given by Material UI documentation)
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('xs')]: {
    marginLeft: theme.spacing(1),
    width: "18ch",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const searchBar = (
  <Search>
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
      sx={{
        my: 0.5,
        mx: -1,
        color: "white",
        display: "block",
        fontSize: ".9rem",
      }}
    />
  </Search>
);

const pages = ["Profile", "Friends", "Settings"];

function NavbarComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorNotif, setAnchorNotif] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, data } = useQuery(QUERY_ALL_USER_PENDING_FRIENDS, {
    variables: {
      userId: AuthService.getProfile().data._id,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log('data', data.userPendingFriend.pendingFriends);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenNotification = (e) => {
    setAnchorNotif(e.currentTarget);
  };
  const handleCloseNotification = (e) => {
    setAnchorNotif(null);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const redirectPage = (page) => {
    window.location.replace(page);
  };
  const handleSearch = (event) => {
    const { name, value } = event.target;
    setSearchValue(value);
    console.log(searchValue);
  };

  const findFriend = async (e) => {
    //e.preventDefault();
    //localStorage.removeItem('lastSearchFriend');
    console.log('--------------------------', searchValue);
    let name = searchValue.split(' ');
    console.log('file: navbar.jsx:149 ~ findFriend ~ name', name);
    localStorage.setItem('lastSearchFriend', name);
    console.log('_______', window.location.href);
    redirectPage('/search');
  };

  return (
    <AppBar
      style={{
        position: 'fixed',
        height: '62px',
        'background-color': '#560027',
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href="/home">
            <img
              src="/assets/RPlaceIcon.png"
              alt="RPlaceIcon"
              className="rplogo"
            />
          </a>
          <Typography
            variant="h6"
            noWrap
            sx={{
              ml: -0.5,
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              fontSize: '1.5rem',
              fontFamily: 'monospace',
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
            lace
          </Typography>
          <Button
            key={searchBar}
            onChange={handleSearch}
            sx={{ my: 0.5, mx: -1.5, color: "white", display: "block" }}
          >
            {searchBar}
          </Button>
          <Button
            key={pages[2]}
            onClick={() => {
              findFriend();
              // !MAC SEA4RCH BAR THING
              //redirectPage(pages[3] + '/?q=' + searchValue);
            }}
            sx={{
              mx: -2,
              color: "white",
              display: "block",
              fontSize: "1.5rem",
            }}
          >
            🔎︎
          </Button>
          <Box
            sx={{
              flexGrow: 1,
              position: 'absolute',
              right: 0,
              display: { xs: 'flex', md: 'none' },
            }}>
            <Box sx={{ flexGrow: 0, mx: -1 }}>
              <IconButton
                className="notifications"
                onClick={handleOpenNotification}
                sx={{ p: 0 }}>
                <Avatar>{data.userPendingFriend.pendingFriends.length}</Avatar>
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorNotif}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorNotif)}
                onClose={handleCloseNotification}>
                <MenuItem>
                  {data.userPendingFriend.pendingFriends.map((user) => (
                    <Notification key={user} userId={user} />
                  ))}
                </MenuItem>
              </Menu>
            </Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    redirectPage(page);
                  }}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                onClick={() => {
                  handleCloseNavMenu();
                  AuthService.logout();
                  redirectPage("/login");
                }}
              >
                <Typography textAlign="center">Sign Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              position: 'absolute',
              right: 0,
              display: { xs: 'none', md: 'flex' },
            }}>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                className="notifications"
                onClick={handleOpenNotification}
                sx={{ p: 0 }}>
                <Avatar>{data.userPendingFriend.pendingFriends.length}</Avatar>
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorNotif}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorNotif)}
                onClose={handleCloseNotification}>
                <MenuItem>
                  {data.userPendingFriend.pendingFriends.map((user) => (
                    <Notification key={user} userId={user} />
                  ))}
                </MenuItem>
              </Menu>
            </Box>
            <Button
              key={pages[0]}
              onClick={() => {
                handleCloseNavMenu();
                redirectPage(pages[0]);
              }}
              sx={{ my: 1, color: 'white', fontSize: '.7rem' }}>
              {pages[0]}
            </Button>
            <Button
              key={pages[1]}
              onClick={() => {
                handleCloseNavMenu();
                redirectPage(pages[1]);
              }}
              sx={{ my: 1, color: 'white', fontSize: '.7rem' }}>
              {pages[1]}
            </Button>
            <Button
              key={pages[2]}
              onClick={() => {
                handleCloseNavMenu();
                redirectPage(pages[2]);
              }}
              sx={{ my: 1, color: 'white', fontSize: '.7rem' }}>
              {pages[2]}
            </Button>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                AuthService.logout();
                redirectPage('/login');
              }}
              sx={{ my: 1, color: "white", fontSize: ".7rem" }}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarComponent;
