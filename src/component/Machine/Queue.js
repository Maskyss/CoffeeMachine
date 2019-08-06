import React, { Component } from "react";

class Queue extends Component {
  render() {
    const { title, queue } = this.props;
    return (
      <div className={title}>
        <p>{title}</p>
        <ul>
          {queue.map((s, key) => (
            <li key={key}>
              {s === "s" ? "standard" : s === "d" ? "double" : "high"}{" "}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Queue;
