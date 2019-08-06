import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Machine from "./component/Machine/Machine";
import Home from "./component/Home";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/espresso" component={() =><Machine title='espresso'/>} />
      <Route path="/americano" component={() =><Machine title='americano'/>} />
      <Route path="/capuchino" component={() =><Machine title='capuchino'/>} />
    </Router>
  );
}

export default App;
