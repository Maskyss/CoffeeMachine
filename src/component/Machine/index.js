import React, { Component } from "react";
import "./index.scss";
import "../Home/index.scss";
import utils from "../../utils/utils";
import Queue from "../Queue";
import Header from "../Header/Header";



class Machine extends Component {
  state = {
    turning: false
  };

  toggle() {
    this.setState({ turning: !this.state.turning });
  }

  render() {

    const {title} = this.props
    const classNameToggle = `toggle-component ${
      this.state.turning ? " active" : ""
    }`;

    return (
      <div>
        <Header/>
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

class Coffee extends Component {

  portionWaterList = utils.portions[`${this.props.title}`]['portionWaterList']
  portionCoffeeList = utils.portions[`${this.props.title}`]['portionCoffeeList']
  portionMilkList = utils.portions[`${this.props.title}`]['portionMilkList']

  state = {
    queue: [],
    currentPortion: "s",
    waterAmount: 100,
    waterTemperature: 80,
    milk:!utils.isEmpty(this.portionMilkList),
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
    const {waterTemperature} = this.state

    if (waterTemperature < 100) {
      this.setState(() => ({
        waterTemperature: waterTemperature + 5,
        process: "bowlings"
      }));
    }
    if (utils.controlTemperature(waterTemperature)) {
      clearInterval(this.interval);
      this.setState(() => ({
        process: "temperature 100^"
      }));
    }
  }

  bowlingWater = () => {
    if (!this.checkList["waterTemperatureChecked"]) {
      this.interval = setInterval(() => this.addTemperature(), 500);
    }
  };
  addWater = () => {
    if (!this.checkList["waterAmountChecked"]) {
      this.setState(() => ({ waterAmount: 500 }));
      this.setState(() => ({ process: "adding water" }));
    }
  };
  addCoffee = () => {
    if (!this.checkList["coffeeAmountChecked"]) {
      this.setState(() => ({ coffeeAmount: 150 }));
      this.setState(() => ({ process: "adding coffee" }));
    }
  };
  addMilk = () => {
    if (!this.checkList["milkAmountChecked"]) {
      this.setState(() => ({ milkAmount: 300 }));
      this.setState(() => ({ process: "adding milk" }));
    }
  };

  pressCoffeeMake = () => {
    this.checkList["coffeeMake"] = true;
    this.checkAllUtils();
  };
  checkAllUtils = () => {
    const { queue, waterTemperature, waterAmount,coffeeAmount } = this.state;
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
    let counterWater = 0;
    let counterCoffee = 0;

    let index = 0;

    for (let k of keysWater) {
      counterWater = counterWater + k;
      counterCoffee = keysCoffee[index];
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
      this.setStateFunction(k, keysCoffee[index]);
      index += 1;
    }
  };

  setStateFunction(amountPortionWater, amountPortionCoffee) {
    const { queue } = this.state;

    if (!Object.values(this.checkList).includes(false)) {
      this.setState(prevState => ({
        portion: prevState.portion.concat(queue.reverse().pop())
      }));
      this.setState(prevState => ({
        process: "made " + prevState.portion
      }));

      this.setState(prevState => ({
        waterAmount: prevState.waterAmount - amountPortionWater
      }));
      this.setState(prevState => ({
        coffeeAmount: prevState.coffeeAmount - amountPortionCoffee
      }));
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
    this.setState(state => ({
      queue: state.queue.concat(state.currentPortion)
    }));
    this.setState(state => ({
      process: "add " + state.currentPortion
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
        <div className="options">
          <select value={this.state.value} onChange={this.handleChangePicklist}>
            {Object.keys(this.portionWaterList).map(key=>
              (<option value={key}>{
                key==='s'?
                    'standard' :
                      key==='d' ?
                          'double' : 'high'}</option>)
            )}
          </select>

          <button onClick={this.handleAddCoffee}>+</button>
          <button onClick={this.bowlingWater}>Bowling</button>
          <button onClick={this.addWater}>Add Water</button>
          <button onClick={this.addCoffee}>Add Coffee</button>

          {this.state.milk ? <button onClick={this.addMilk}>Add Milk</button>: <></>}

          <button onClick={this.pressCoffeeMake}>Make COFFEE</button>
        </div>
        <div>
          <p>Amount water</p>
            {waterAmount}
          <p>Temperature water</p>
            {waterTemperature}
          <p>Amount coffee</p>
            {coffeeAmount}
          {this.state.milk
              ? <>
                   <p>Amount milk</p>
                  {this.state.milkAmount}
                </>
              : <></>}
          <h3>Process</h3>
            {process}
        </div>
        <div>
          <Queue title='Queue' queue={queue} />
          <Queue title='Ready' queue={portion} />
        </div>
      </div>
    );
  }
}

