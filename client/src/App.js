import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import NoNav from './components/NoNav';
import WithNav from './components/WithNav';
import Login from './pages/main/main';
import Register from './pages/register/register';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';
import ProfileId from './pages/profile/profileId';
import Search from './pages/search/search';
import Settings from './pages/settings/settings';
import Friend from './pages/friends/friends';

const authLink = setContext((_, { headers }) => {
  if (localStorage.getItem('id_token') === null) {
    console.log('expired?');
    localStorage.clear();
  }
  const token = localStorage.getItem('id_token');
  //console.log('🚀 ~ file: App.js:19 ~ authLink ~ token', token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route element={<NoNav />}>
            {/* default route - redirect to login */}
            <Route path="/" element={<Login />} />

            {/* dedicated login route */}
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<WithNav />}>
            {/* specific posts with comments */}
            <Route path="/home" element={<Home />} />

            {/* user profile */}
            <Route path="/profile" element={<Profile />} />

            <Route path="/profile/:id" element={<ProfileId />} />

            <Route path="/home" element={<Home />} />

            {/* search for friends */}
            <Route path="/search" element={<Search />} />

            {/* settings */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/friends" element={<Friend />} />

            {/* user messages */}
            {/* <Route path="/messages" element={<Messages />} /> */}

            {/* Route Not Found */}
            {/* <Route 
                  path="*"
                  element={<NotFound />}
                /> */}
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
