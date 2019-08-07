import React, { Component } from "react";

class Info extends Component {
  render() {
    const {
      waterAmount,
      waterTemperature,
      coffeeAmount,
      portionList,
      process,
      milkAmount
    } = this.props;

    const milk = portionList.portionMilkList.small;

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
        {process}
      </div>
    );
  }
}

export default Info;
