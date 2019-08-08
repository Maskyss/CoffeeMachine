import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Styles from './index.module.scss';

class Header extends Component {
  render() {
    return (
      <div className={Styles.gridContainer}>
          <div className={Styles.gridColumn}>
          <NavLink to="/americano">
            <h2>Americano</h2>
          </NavLink>
        </div>
          <div className={Styles.gridColumn}>
          <NavLink to="/cappuccino">
            <h2>Cappuccino</h2>
          </NavLink>
        </div>
          <div className={Styles.gridColumn}>
          <NavLink to="/espresso">
            <h2>Espresso</h2>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default Header;
