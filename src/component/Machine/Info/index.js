import React, { Component } from "react";
import './index.scss'
class Info extends Component {
  render() {
    const {
      waterAmount,
      waterTemperature,
      coffeeAmount,
      portionList,
      processName,
      milkAmount
    } = this.props;

    const milk = portionList.small.milk;

    return (
      <div>
        <p>Amount water</p>
        {waterAmount}
        <p>Temperature water</p>
        {waterTemperature}
        <p>Amount coffee</p>
        {coffeeAmount}
        {milk !== 0 ? (
          <>
            <p>Amount milk</p>
            {milkAmount}
          </>
        ) : (
          <></>
        )}
        <h3>Process</h3>
        {processName}
      </div>
    );
  }
}

export default Info;
