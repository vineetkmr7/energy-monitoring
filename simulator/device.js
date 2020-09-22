const request = require('request');
// request.patch('http://localhost:3000/devices/5f67e2739572a240590f9c4e/consume', { form: { powerConsumed: 10 } })
//     .on('response', (response) => {
//         console.log("response", response.body);
//     })
class Device {
    intervalTimer;
    constructor(id, power, time) {
        this.id = id;
        this.power = power;
        this.time = time;
    }
    powerOn() {
        this.intervalTimer = setInterval(() => {
            request.patch(`http://localhost:3000/devices/${this.id}/consume`, { form: { powerConsumed: 10 } }, (err, response) => {
                // console.log(response.body.response.name, " consumed =>", response.body.response.powerConsumed);
            })

        }, this.time);
    }
    powerOff() {
        clearInterval(this.intervalTimer);
    }
}
module.exports = Device;