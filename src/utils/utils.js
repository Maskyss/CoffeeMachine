const portions= {
    espresso:{
        portionWaterList: {
            s: 50,
            d: 100
        },
        portionCoffeeList: {
            s: 20,
            d: 40
        },
        portionMilkList: {},
    },
    americano:{
        portionWaterList: {
            s: 150,
            d: 300,
        },
        portionCoffeeList: {
            s: 20,
            d: 40
        }},
    portionMilkList: {},
    capuchino:{
        portionWaterList: {
            s: 100,
            d: 150,
            h: 200
        },
        portionCoffeeList: {
            s: 20,
            d: 40,
            h: 50
        },
        portionMilkList: {
            s: 60,
            d: 100,
            h: 150
        },
    },
}

const utils = {
    controlTemperature: (currentTemp) => {
        return currentTemp===100
    },

    addTemperature:(currentTemp) =>{
        return currentTemp+5
    },

    controlWaterLevel: (currentWaterLevel, neededWaterLevel) => {
        return currentWaterLevel >= neededWaterLevel
    },
    controlCoffeeLevel: (currentCoffeeLevel, neededCoffeeLevel) => {

        return currentCoffeeLevel >= neededCoffeeLevel
    },
    controlMilkLevel: (currentMilkLevel) => {
        //......
    },

    isEmpty:(obj) => {
        for (let key in obj) {
            return false;
        }
        return true;
    }
};

export default {utils,portions};
