import React, { Component } from "react";
import americano from "../../svg/americano.gif";
import capuchino from "../../svg/capuchino.gif";
import espresso from "../../svg/espresso.gif";
import { NavLink } from "react-router-dom";
import "../Machine/index.scss";


class Home extends Component {
  render() {
    return (
      <div className={'grid-container'}>
        <NavLink to="/americano">
          <img src={americano} alt="Americano" />
        </NavLink>

        <NavLink to="/capuchino">
          <img src={capuchino} alt="Capuchino" />
        </NavLink>

        <NavLink to="/espresso">
          <img src={espresso} alt="Espresso" />
        </NavLink>
      </div>
    );
  }
}

export default Home;
