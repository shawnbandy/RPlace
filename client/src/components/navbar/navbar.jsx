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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

// Sets styling for the search bar inside of the Navbar (the example given by Material UI documentation)
// const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(1),
//       width: 'auto',
//     },
//   }));

//   const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }));

//   const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//       transition: theme.transitions.create('width'),
//       width: '100%',
//       [theme.breakpoints.up('sm')]: {
//         width: '12ch',
//         '&:focus': {
//           width: '20ch',
//         },
//       },
//     },
// }));

// const searchBar = (<Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Search>);

const pages = ["Profile", "Friends", "Search", "Settings", "Sign Out"];

function NavbarComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const redirectPage = (page) => {
    window.location.replace(page);
  };
  const handleSearch = (event) => {
    const { name, value } = event.target;
    setSearchValue(value);
    console.log(searchValue);
  };

  return (
    <AppBar
      style={{
        position: "fixed",
        height: "62px",
        "background-color": "#560027",
      }}
    >
      <Container maxWidth="x1">
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
              key={pages[3]}
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
