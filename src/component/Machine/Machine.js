import React, { Component } from "react";
import "./index.scss";
import {Coffee} from "./Coffee";
import Header from "../Header/Header";

class Machine extends Component {
  state = {
    turning: false
  };

  toggle() {
    this.setState({ turning: !this.state.turning });
  }

  render() {
    const { title } = this.props;
    const classNameToggle = `toggle-component ${
      this.state.turning ? " active" : ""
    }`;

    return (
      <div>
        <Header />
        <div>
          <h1>{title} Machine</h1>
          <div className={classNameToggle} onClick={() => this.toggle()}>
            <div className="toggle-button" />
          </div>
        </div>

        {this.state.turning ? <Coffee title={title} /> : <div />}
      </div>
    );
  }
}

export default Machine;
