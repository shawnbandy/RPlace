import "./navbar.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_FIND_USERS,
  QUERY_ALL_USER_PENDING_FRIENDS,
} from "../../context/queries";
import SearchFriend from "../friends/searchFriend";
import { Navigate, Link, useNavigate } from "react-router-dom";
import AuthService from "../../context/auth";
import Notification from "./notifications";

import { NavLink } from "react-router-dom";

const pages = ["Profile", "Friends", "Search", "Settings", "Sign Out"];

function NavbarComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorNotif, setAnchorNotif] = React.useState(null);
  const { loading, data } = useQuery(QUERY_ALL_USER_PENDING_FRIENDS, {
    variables: {
      userId: AuthService.getProfile().data._id,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("data", data.userPendingFriend.pendingFriends);

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

  return (
    <AppBar
      style={{
        position: "fixed",
        height: "62px",
        "background-color": "#560027",
      }}
    >
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
              display: { xs: "none", sm: "flex" },
              fontSize: "1.5rem",
              fontFamily: "monospace",
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            lace
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              position: "absolute",
              right: 0,
              display: { xs: "flex", sm: "none" },
            }}
          >
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                className="notifications"
                onClick={handleOpenNotification}
                sx={{ p: 0 }}
              >
                <Avatar>{data.userPendingFriend.pendingFriends.length}</Avatar>
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorNotif}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorNotif)}
                onClose={handleCloseNotification}
              >
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
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    redirectPage(page);
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              position: "absolute",
              right: 0,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Button
              key={pages[0]}
              onClick={() => {
                handleCloseNavMenu();
                redirectPage(pages[0]);
              }}
              sx={{ my: 1, color: "white" }}
            >
              {pages[0]}
            </Button>
            <Button
              key={pages[1]}
              onClick={() => {
                handleCloseNavMenu();
                redirectPage(pages[1]);
              }}
              sx={{ my: 1, color: "white" }}
            >
              {pages[1]}
            </Button>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                className="notifications"
                onClick={handleOpenNotification}
                sx={{ p: 0 }}
              >
                <Avatar>{data.userPendingFriend.pendingFriends.length}</Avatar>
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorNotif}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorNotif)}
                onClose={handleCloseNotification}
              >
                <MenuItem>
                  {data.userPendingFriend.pendingFriends.map((user) => (
                    <Notification key={user} userId={user} />
                  ))}
                </MenuItem>
              </Menu>
            </Box>
            <Button
              key={pages[2]}
              onClick={() => {
                handleCloseNavMenu();
                redirectPage(pages[2]);
              }}
              sx={{ my: 1, color: "white" }}
            >
              {pages[2]}
            </Button>
            <Button
              key={pages[3]}
              onClick={() => {
                handleCloseNavMenu();
                redirectPage(pages[3]);
              }}
              sx={{ my: 1, color: "white" }}
            >
              {pages[3]}
            </Button>
            <Button
              key={pages[4]}
              onClick={() => {
                handleCloseNavMenu();
                redirectPage(pages[4]);
              }}
              sx={{ my: 1, color: "white" }}
            >
              {pages[4]}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarComponent;
