export class Device {
    name: string;
    powerConsumed: number;
    status: string;

    constructor(name, powerConsumed = 0, status = 'OFFLINE') {
        this.name = name;
        this.powerConsumed = powerConsumed;
        this.status = status;
    }
}