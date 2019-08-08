import React, { Component } from "react";
import './index.scss'
class Controls extends Component {
  render() {
    const {
      handleAddCoffee,
      bowlingWater,
      addWater,
      addCoffee,
      handleChangePicklist,
      addMilk,
      pressCoffeeMake,
      portionList
    } = this.props;
    const milk = portionList.small.milk;

    return (
      <>
        <select value={this.value} onChange={handleChangePicklist}>
          {Object.keys(portionList).map((key, index) => (
            <option key={index} value={key}>
              {key}
            </option>
          ))}
        </select>
        <button onClick={handleAddCoffee}>+</button>
        <button onClick={bowlingWater}>Bowling</button>
        <button onClick={addWater}>Add Water</button>
        <button onClick={addCoffee}>Add Coffee</button>

        {milk !== 0 ? <button onClick={addMilk}>Add Milk</button> : <></>}

        <button onClick={pressCoffeeMake}>Make COFFEE</button>
      </>
    );
  }
}

export default Controls;
