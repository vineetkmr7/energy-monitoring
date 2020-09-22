const Device = require('./device');

const tv = new Device('5f67e2739572a240590f9c4e', 10, 10000);
const fridge = new Device('5f67e2879572a240590f9c4f', 50, 10000);
const washingMachine = new Device('5f67cb2b1ad89236593a26f4', 100, 10000);
tv.powerOn();
fridge.powerOn();
washingMachine.powerOn();

setTimeout(() => {
    tv.powerOff();
    console.log("TV turned off");
}, 10000);


setTimeout(() => {
    fridge.powerOff();
    console.log("fridge turned off");
}, 20000);


setTimeout(() => {
    washingMachine.powerOff();
    console.log("washingMachine turned off");
}, 30000);