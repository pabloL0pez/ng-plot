import { Injectable } from "@angular/core";

@Injectable()
export class MathService {

    constructor() {}

    /**
     * Returns the relative percentage between two values.
     * @param value1 the first value
     * @param value2 the second value2
     * @returns a value between `0` and `1` that represents the percentage
     */
    getRelativePercentage(value1: number, value2: number): number {
        return value1 / value2;
    }
}