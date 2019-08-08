import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Toggle from "./component/Machine/Toggle";
import Home from "./component/Home/Home";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/espresso" component={() => <Toggle title="espresso" />} />
      <Route path="/americano" component={() => <Toggle title="americano" />}/>
      <Route path="/cappuccino" component={() => <Toggle title="cappuccino" />}/>
    </Router>
  );
}

export default App;
