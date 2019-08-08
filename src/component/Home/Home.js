import React, { Component } from "react";
import americano from "../../theme/svg/americano.gif";
import cappuccino from "../../theme/svg/capuchino.gif";
import espresso from "../../theme/svg/espresso.gif";
import { NavLink } from "react-router-dom";
import Styles from "./index.module.scss";

class Home extends Component {
  render() {
    return (
      <div className={Styles.gridContainer}>
        <NavLink to="/americano">
          <img src={americano} alt="Americano" />
        </NavLink>

        <NavLink to="/cappuccino">
          <img src={cappuccino} alt="Cappuccino" />
        </NavLink>

        <NavLink to="/espresso">
          <img src={espresso} alt="Espresso" />
        </NavLink>
      </div>
    );
  }
}

export default Home;
