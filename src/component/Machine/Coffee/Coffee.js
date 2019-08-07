import { portions, utils } from "../../../utils/utils";
import Queue from "../Queue/Queue";
import React, { Component } from "react";
import RightInfoBlock from "../RightInfoBlock/RightInfoBlock";
import Controls from "../Controls/Controls";
import Info from "../Info/Info";

export class Coffee extends Component {
  state = {
    queue: [],
    readyCoffee: [],
    currentPortion: "small",
    waterAmount: 100,
    waterTemperature: 80,
    milkAmount: 100,
    coffeeAmount: 100,
    interval: null,
    process: "",

    portionList: portions[`${this.props.title}`] //when first rendering portionList is Empty
                                                  // so I send in child component nothing
  };

  addTemperature() {
    const { waterTemperature, interval } = this.state;

    if (waterTemperature < 100) {
      this.setState({
        waterTemperature: waterTemperature + 5,
        process: "bowlings"
      });
    }
    if (utils.controlTemperature(waterTemperature)) {
      clearInterval(interval);
      this.setState({
        interval: null,
        process: "temperature 100`"
      });
    }
  }

  bowlingWater = () => {
    this.setState({
      interval: setInterval(() => this.addTemperature(), 500)
    });
  };
  addWater = () => {
    this.setState({
      waterAmount: 500,
      process: "adding water"
    });
  };
  addCoffee = () => {
    this.setState({
      coffeeAmount: 150,
      process: "adding coffee"
    });
  };
  addMilk = () => {
    this.setState({
      milkAmount: 300,
      process: "adding milk"
    });
  };

  pressCoffeeMake = () => {
    const { queue, portionList } = this.state;

    const arrOfPortion = Object.values(portionList).map(k1 => k1[queue[0]]);
    const checking = this.checkAllIngridients(arrOfPortion);

    if (checking) {
      this.setState(prevState => ({
        waterAmount: prevState.waterAmount - arrOfPortion[0],
        coffeeAmount: prevState.coffeeAmount - arrOfPortion[1],
        milkAmount: (prevState.milkAmount = arrOfPortion[2]),
        readyCoffee: prevState.readyCoffee.concat(queue.shift()),
        process: "coffee is ready"
      }));
    } else {
      this.setState({
        process: "we need something"
      });
    }
  };
  checkAllIngridients = arr => {
    const {
      waterAmount,
      waterTemperature,
      milkAmount,
      coffeeAmount
    } = this.state;
    const waterAmountChecked = [
      utils.controlLevel(waterAmount, arr[0]),
      utils.controlTemperature(waterTemperature),
      utils.controlLevel(coffeeAmount, arr[1]),
      utils.controlLevel(milkAmount, arr[2])
    ];
    return !waterAmountChecked.includes(false);
  };

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
    const { queue, readyCoffee, portionList } = this.state;

    return (
      <div className="grid-container">
        <div>
          <RightInfoBlock portionList={portionList} />
          <Controls {...this} portionList={portionList} />
        </div>

        <div>
          <Info {...this.state} />
        </div>
        <div>
          <Queue title="Queue" queue={queue} />
          <Queue title="Ready" queue={readyCoffee} />
        </div>
      </div>
    );
  }
}
