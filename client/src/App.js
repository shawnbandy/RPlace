import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import NavbarComponent from "./components/navbar/navbar";
import Login from './pages/main/main';
import Register from './pages/register/register';
import Home from './pages/home/home';
import Profile from './pages/profile/profile';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
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
          {/* default route - redirect to login */}
          <Route path="/" element={<Login />} />

          {/* dedicated login route */}
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* where all posts are rendered */}
          <Route path="/home" element={<Home />} />

          {/* specific posts with comments */}
          {/* <Route path="/home/:id" element={<Home />} /> */}

          {/* user profile */}
          <Route path="/profile" element={<Profile />} />

          {/* user messages */}
          {/* <Route path="/messages" element={<Messages />} /> */}

          {/* Route Not Found */}
          {/* <Route 
              path="*"
              element={<NotFound />}
            /> */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
