import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import './index.scss'

class Header extends Component {
    render() {
        return (
            <div className={'grid-container'}>
                <NavLink to="/americano">
                    <h2>Americano</h2>
                </NavLink>

                <NavLink to="/capuchino">
                    <h2>Cappuccino</h2>
                </NavLink>

                <NavLink to="/espresso">
                    <h2>Espresso</h2>
                </NavLink>
            </div>
        );
    }
}

export default Header;
