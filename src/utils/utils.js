export const portions = {
  espresso: {
    portionWaterList: {
      small: 50,
      double: 100
    },
    portionCoffeeList: {
      small: 20,
      double: 40
    },
    portionMilkList: {
      small: 0,
      double: 0
    }
  },
  americano: {
    portionWaterList: {
      small: 150,
      double: 300
    },
    portionCoffeeList: {
      small: 20,
      double: 40
    },
    portionMilkList: {
      small: 0,
      double: 0
    }
  },
  capuchino: {
    portionWaterList: {
      small: 100,
      double: 150,
      big: 200
    },
    portionCoffeeList: {
      small: 20,
      double: 40,
      big: 50
    },
    portionMilkList: {
      small: 60,
      double: 100,
      big: 150
    }
  }
};

export const utils = {
  controlTemperature: currentTemp => {
    return currentTemp === 100;
  },

  controlLevel: (currentLevel, neededLevel) => {
    return currentLevel >= neededLevel;
  },
};
