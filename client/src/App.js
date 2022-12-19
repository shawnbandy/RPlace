import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import NoNav from "./components/NoNav";
import WithNav from "./components/WithNav";
import Login from "./pages/main/main";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Search from "./pages/search/search";
import Settings from "./pages/settings/settings";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  console.log("🚀 ~ file: App.js:19 ~ authLink ~ token", token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "/graphql",
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
            <Route element={<NoNav/>}>
              {/* default route - redirect to login */}
              <Route path="/" element={<Login />} />

              {/* dedicated login route */}
              <Route path="/login" element={<Login />} />

              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<WithNav/>}>

              {/* where all posts are rendered */}
              <Route path="/home" element={<Home />} />

              {/* specific posts with comments */}
              {/* <Route path="/home/:id" element={<Home />} /> */}

              {/* user profile */}
              <Route path="/profile" element={<Profile />} />

              {/* search for friends */}
              <Route path="/search" element={<Search />} />

              {/* settings */}
              <Route path="/settings" element={<Settings />} />

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
