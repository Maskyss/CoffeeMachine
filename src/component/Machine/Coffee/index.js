import { portions, utils } from "../../../utils";
import Queue from "../Queue";
import React, { Component } from "react";
import RightInfoBlock from "../RightInfoBlock";
import Controls from "../Controls";
import Info from "../Info";
import Styles from './index.module.scss'

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
    processName: "",

    portionList: portions[`${this.props.title}`] //when first rendering portionList is Empty
    // so I send in child component nothing
  };

  addTemperature() {
    const { waterTemperature, interval } = this.state;

    if (waterTemperature < 100) {
      this.setState({
        waterTemperature: waterTemperature + 5,
        processName: "bowlings"
      });
    }
    if (utils.controlTemperature(waterTemperature)) {
      clearInterval(interval);
      this.setState({
        interval: null,
        processName: "temperature 100`"
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
      processName: "adding water"
    });
  };
  addCoffee = () => {
    this.setState({
      coffeeAmount: 150,
      processName: "adding coffee"
    });
  };
  addMilk = () => {
    this.setState({
      milkAmount: 300,
      processName: "adding milk"
    });
  };

  pressCoffeeMake = () => {
    const { queue, portionList } = this.state;
    const arrOfPortion = portionList[[`${queue[0]}`]];
    if (queue.length !== 0) {
      const checking = this.checkAllIngridients(arrOfPortion);
      console.log(checking);

      if (checking) {
        this.setState(prevState => ({
          waterAmount: prevState.waterAmount - arrOfPortion.water,
          coffeeAmount: prevState.coffeeAmount - arrOfPortion.coffee,
          milkAmount: (prevState.milkAmount = arrOfPortion.milk),
          readyCoffee: prevState.readyCoffee.concat(queue.shift()),
          processName: arrOfPortion.name + " is ready"
        }));
      } else {
        this.setState({
          processName: "we need something"
        });
      }
    } else {
      this.setState({
        processName: "make an order"
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
      utils.controlLevel(waterAmount, arr.water),
      utils.controlTemperature(waterTemperature),
      utils.controlLevel(coffeeAmount, arr.coffee),
      utils.controlLevel(milkAmount, arr.milk)
    ];
    return !waterAmountChecked.includes(false);
  };

  handleChangePicklist = event => {
    this.setState({ currentPortion: event.target.value });
  };

  handleAddCoffee = () => {
    this.setState(prevState => ({
      queue: prevState.queue.concat(prevState.currentPortion),
      processName: "add " + prevState.currentPortion
    }));
  };

  render() {
    const { queue, readyCoffee, portionList } = this.state;

    return (
      <div className={Styles.gridContainer}>
        <div className={Styles.gridColumn}>
          <RightInfoBlock portionList={portionList} />
          <Controls {...this} portionList={portionList} />
        </div>

        <div className={Styles.gridColumn}>
          <Info {...this.state} />
        </div>
        <div className={Styles.gridColumn}>
        <Queue title="Queue" queue={queue} />
          <Queue title="Ready" queue={readyCoffee} />
        </div>
      </div>
    );
  }
}

export default Coffee;

