import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import "../Machine/index.scss";

class Header extends Component {
    render() {
        return (
            <div className="grid-container header">
                <div className="navLink">
                    <NavLink to="/americano">
                        <h2>Americano</h2>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/capuchino">
                        <h2>Cappuccino</h2>
                    </NavLink>
                </div>
                <div>
                    <NavLink to="/espresso">
                        <h2>Espresso</h2>
                    </NavLink>
                </div>
            </div>
        );
    }
}

export default Header;
