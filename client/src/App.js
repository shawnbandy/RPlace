import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

// import NavbarComponent from "./components/navbar/navbar";
import Login from "./pages/main/main";
import Register from "./pages/register/register";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";

const client = new ApolloClient({
  uri: "/graphql",
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
          <Route path="/home" element={<Home />} />

          <Route path="/register" element={<Register />} />

          {/* where all posts are rendered */}
          {/* <Route path="/home" element={<Home />} /> */}

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
