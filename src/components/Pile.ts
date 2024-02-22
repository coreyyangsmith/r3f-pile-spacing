export default class Pile {
    length: number;
    diameter: number;
    radius: number;
    batterAngle: number;

    constructor(length: number = 10, diameter: number = 1, radius: number = 1, batterAngle: number = 5) {
        this.length = length;
        this.diameter = diameter;
        this.radius = radius;
        this.batterAngle = batterAngle;
    }
}