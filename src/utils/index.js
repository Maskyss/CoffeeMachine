// export const portions = {
//   espresso: {
//     portionWaterList: {
//       small: 50,
//       double: 100
//     },
//     portionCoffeeList: {
//       small: 20,
//       double: 40
//     },
//     portionMilkList: {
//       small: 0,
//       double: 0
//     }
//   },
//
//   americano: {
//     portionWaterList: {
//       small: 150,
//       double: 300
//     },
//     portionCoffeeList: {
//       small: 20,
//       double: 40
//     },
//     portionMilkList: {
//       small: 0,
//       double: 0
//     }
//   },
//
//   capuchino: {
//     portionWaterList: {
//       small: 100,
//       double: 150,
//       big: 200
//     },
//     portionCoffeeList: {
//       small: 20,
//       double: 40,
//       big: 50
//     },
//     portionMilkList: {
//       small: 60,
//       double: 100,
//       big: 150
//     }
//   }
// };

export const portions = {
  espresso: {
    small: {
      name: "Espresso",
      water: 30,
      coffee: 9,
      milk: 0
    },
    double: {
      name: "Doppio",
      water: 60,
      coffee: 18,
      milk: 0
    }
  },
  cappuccino: {
    small: {
      name: "Cappuccino classic",
      water: 30,
      coffee: 9,
      milk: 90
    },
    double: {
      name: "Cappuccino double",
      water: 60,
      coffee: 18,
      milk: 120
    }
  },
  americano: {
    small: {
      name: "Americano classic",
      water: 80,
      coffee: 9,
      milk: 0
    },
    double: {
      name: "Americano double",
      water: 160,
      coffee: 18,
      milk: 0
    }
  }
};

export const utils = {
  controlTemperature: currentTemp => {
    return currentTemp === 100;
  },

  controlLevel: (currentLevel, neededLevel) => {
    return currentLevel >= neededLevel;
  }
};
