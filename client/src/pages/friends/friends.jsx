// import * as React from 'react';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
// import ImageIcon from '@mui/icons-material/Image';
// import WorkIcon from '@mui/icons-material/Work';
// import BeachAccessIcon from '@mui/icons-material/BeachAccess';
// import { useQuery } from '@apollo/client';
// import { ME } from '../../context/queries';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Unstable_Grid2';


// function FriendList(props) {
//     friendData = props.props.
// }


// function Friends() {

// };

// Sets styling for the search bar inside of the Navbar (the example given by Material UI documentation)
// const Search = styled("div")(({ theme }) => ({
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginLeft: 0,
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       marginLeft: theme.spacing(1),
//       width: "auto",
//     },
//   }));
  
//   const SearchIconWrapper = styled("div")(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   }));
  
//   const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: "inherit",
//     "& .MuiInputBase-input": {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//       transition: theme.transitions.create("width"),
//       width: "100%",
//       [theme.breakpoints.up("sm")]: {
//         width: "12ch",
//         "&:focus": {
//           width: "20ch",
//         },
//       },
//     },
//   }));

// const searchBar = (
//     <Search>
//       <SearchIconWrapper>
//         <SearchIcon />
//       </SearchIconWrapper>
//       <StyledInputBase
//         placeholder="Search…"
//         inputProps={{ "aria-label": "search" }}
//       />
//     </Search>
//   );

// const [searchValue, setSearchValue] = React.useState('');

// const handleSearch = (event) => {
//     const { name, value } = event.target;
//     setSearchValue(value);
//     console.log(searchValue);
//   };

//   const findFriend = async (e) => {
//     //e.preventDefault();
//     //localStorage.removeItem('lastSearchFriend');
//     console.log('--------------------------', searchValue);
//     let name = searchValue.split(' ');
//     console.log('file: navbar.jsx:149 ~ findFriend ~ name', name);
//     localStorage.setItem('lastSearchFriend', name);
//     console.log('_______', window.location.href);
//     redirectPage('/search');
//   };