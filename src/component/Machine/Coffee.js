import { portions, utils } from "../../utils/utils";
import Queue from "./Queue";
import React, { Component } from "react";

export class Coffee extends Component {
  portionWaterList = portions[`${this.props.title}`]["portionWaterList"];
  portionCoffeeList = portions[`${this.props.title}`]["portionCoffeeList"];
  portionMilkList = portions[`${this.props.title}`]["portionMilkList"];

  state = {
    queue: [],
    currentPortion: "s",
    waterAmount: 100,
    waterTemperature: 80,
    milk: !utils.isEmpty(this.portionMilkList),
    milkAmount: 100,
    coffeeAmount: 100,
    portion: [],
    process: ""
  };

  checkList = {
    waterAmountChecked: false,
    waterTemperatureChecked: false,
    milkAmountChecked: true,
    coffeeAmountChecked: false,
    coffeeMake: false
  };

  addTemperature() {
    const { waterTemperature } = this.state;

    if (waterTemperature < 100) {
      this.setState(() => ({
        waterTemperature: waterTemperature + 5,
        process: "bowlings"
      }));
    }
    if (utils.controlTemperature(waterTemperature)) {
      clearInterval(this.interval);
      this.setState(() => ({
        process: "temperature 100`"
      }));
    }
  }

  bowlingWater = () => {
    if (!this.checkList["waterTemperatureChecked"]) {
      this.interval = setInterval(() => this.addTemperature(), 500);
    }
  };
  addWater = () => {
    this.setState(() => ({
      waterAmount: 500,
      process: "adding water"
    }));
  };
  addCoffee = () => {
    this.setState(() => ({
      coffeeAmount: 150,
      process: "adding coffee"
    }));
  };
  addMilk = () => {
      this.setState(() => ({ milkAmount: 300 }));
      this.setState(() => ({ process: "adding milk" }));
  };

  pressCoffeeMake = () => {
    this.checkList["coffeeMake"] = true;
    this.checkAllUtils();
  };
  checkAllUtils = () => {
    const { queue, waterTemperature, waterAmount, coffeeAmount, milkAmount } = this.state;
    const portionList = this.portionWaterList;
    const portionCoffeeList = this.portionCoffeeList;

    let keysWater = queue.map(item => {
      let indexPortion = Object.keys(portionList).findIndex(
        key => key === item
      );
      return Object.values(portionList)[indexPortion];
    });

    let keysCoffee = queue.map(item => {
      let indexPortion = Object.keys(portionCoffeeList).findIndex(
        key => key === item
      );
      return Object.values(portionCoffeeList)[indexPortion];
    });
    let keyMilk = []
    if(this.state.milk){
        keyMilk = queue.map(item => {
            let indexPortion = Object.keys(this.portionMilkList).findIndex(
                key => key === item
            );
            return Object.values(this.portionMilkList)[indexPortion];
        });
    }
    let counterWater = 0;
    let counterCoffee = 0;
    let counterMilk = 0;
    let index = 0;

    for (let k of keysWater) {
      counterWater = counterWater + k;
      counterCoffee = counterCoffee + keysCoffee[index];
      if(this.state.milk){
          counterMilk = counterMilk + keyMilk[index];
          this.checkList["milkAmountChecked"] = utils.controlMilkLevel(
              milkAmount,
              counterMilk
          );
      }
      this.checkList["waterAmountChecked"] = utils.controlWaterLevel(
        waterAmount,
        counterWater
      );
      this.checkList["coffeeAmountChecked"] = utils.controlCoffeeLevel(
        coffeeAmount,
        counterCoffee
      );

      this.checkList["waterTemperatureChecked"] = utils.controlTemperature(
        waterTemperature
      );
      if (this.checkList["coffeeAmountChecked"]) {
        this.setState(state => ({
          process: "grinding coffee"
        }));
      }
      if(!this.state.milk)
        this.setStateFunction(k, keysCoffee[index],milkAmount);
      else {
          this.setStateFunction(k, keysCoffee[index],keyMilk[index]);
      }
      index += 1;
    }
  };

  setStateFunction(amountPortionWater, amountPortionCoffee,amountPortionMilk) {
    const { queue } = this.state;
    // const {checkList} = this.checkList
    if (!Object.values(this.checkList).includes(false)) {
      this.setState(prevState => ({
        portion: prevState.portion.concat(queue.shift().slice(0, 1)),
        process: "coffee is ready", // prevState.portion,
        waterAmount: prevState.waterAmount - amountPortionWater,
        coffeeAmount: prevState.coffeeAmount - amountPortionCoffee,
      }));
      if(this.state.milk){
          this.setState((prevState)=>({
              milkAmount: prevState.milkAmount - amountPortionMilk
          }))
      }
    } else {

      this.setState(() => ({
        process: "we need something"
      }));
      console.log(this.checkList);
      this.checkList["coffeeMake"] = false;
    }
  }

  handleChangePicklist = event => {
    this.setState({ currentPortion: event.target.value });
  };

  handleAddCoffee = () => {
    this.setState(prevState => ({
      queue: prevState.queue.concat(prevState.currentPortion),
      process: "add " + prevState.currentPortion
    }));
  };

  render() {
    const {
      queue,
      waterAmount,
      waterTemperature,
      coffeeAmount,
      portion,
      process
    } = this.state;

    return (
      <div className="grid-container">
        <div>
            <div className="rightBlock">
                {Object.keys(this.portionWaterList).map((key) => (
                    <span>{key === "s" ? "standard" : key === "d" ? "double" : "high"} </span>
                ))}
                <br></br>
                <span>Water </span>
                {Object.values(this.portionWaterList).map((key) => (
                    <span>{key} </span>
                ))}
                <br></br>
                <span>Coffee </span>
                {Object.values(this.portionCoffeeList).map((key) => (
                    <span>{key} </span>
                ))}
                {this.state.milk ? (
                    <>
                        <br></br>
                    <span>Milk </span>
                    {Object.values(this.portionMilkList).map((key) => (
                            <span>{key} </span>
                        ))}
                        </>
                ) : (
                    <></>
                )}
                </div>
          <select value={this.state.value} onChange={this.handleChangePicklist}>
            {Object.keys(this.portionWaterList).map(key => (
              <option value={key}>
                {key === "s" ? "standard" : key === "d" ? "double" : "high"}
              </option>
            ))}
          </select>

          <button onClick={this.handleAddCoffee}>+</button>
          <button onClick={this.bowlingWater}>Bowling</button>
          <button onClick={this.addWater}>Add Water</button>
          <button onClick={this.addCoffee}>Add Coffee</button>

          {this.state.milk ? (
            <button onClick={this.addMilk}>Add Milk</button>
          ) : (
            <></>
          )}

          <button onClick={this.pressCoffeeMake}>Make COFFEE</button>
        </div>
        <div>
          <p>Amount water</p>
          {waterAmount}
          <p>Temperature water</p>
          {waterTemperature}
          <p>Amount coffee</p>
          {coffeeAmount}
          {this.state.milk ? (
            <>
              <p>Amount milk</p>
              {this.state.milkAmount}
            </>
          ) : (
            <></>
          )}
          <h3>Process</h3>
          {process}
        </div>
        <div>
          <Queue title="Queue" queue={queue} />
          <Queue title="Ready" queue={portion} />
        </div>
      </div>
    );
  }
}
