import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Post from "./container/Post";
import SearchComp from "./container/SearchComp";


function App() {
  return (
    <>
      <Router>
        <Route path="/" component={Post} exact />
        <Route path="/search" component={SearchComp} exact />
      </Router>
    </>
  );
}

export default App;
