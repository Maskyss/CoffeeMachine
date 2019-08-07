import React, { Component } from "react";

class Controls extends Component {
  render() {
    const child = this.props;
    const milk = child.portionList.portionMilkList.small;

    return (
      <>
        <select value={this.value} onChange={child.handleChangePicklist}>
          {Object.keys(child.portionList.portionWaterList).map((key, index) => (
            <option key={index} value={key}>
              {key}
            </option>
          ))}
        </select>
        <button onClick={child.handleAddCoffee}>+</button>
        <button onClick={child.bowlingWater}>Bowling</button>
        <button onClick={child.addWater}>Add Water</button>
        <button onClick={child.addCoffee}>Add Coffee</button>

        {milk !== 0 ? <button onClick={child.addMilk}>Add Milk</button> : <></>}

        <button onClick={child.pressCoffeeMake}>Make COFFEE</button>
      </>
    );
  }
}

export default Controls;
