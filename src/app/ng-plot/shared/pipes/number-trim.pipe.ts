import { Pipe, PipeTransform } from "@angular/core";

const INITIALS_MAP: string[] = ["K", "M", "B", "T", "Q"];

@Pipe({
    name: 'numbertrim',
    pure: true,
})
export class NumberTrimPipe implements PipeTransform {

    /**
     * Trims some digits from a number and displays an initial instead.
     * 
     * - `K` for `1.000s`
     * - `M` for `1.000.000s`
     * - `B` for `1000.000.000s`
     * - `T` for `1000.000.000.000s`
     * - `Q` for `1000.000.000.000.000s`
     * 
     * @param value the numeric value
     * @param args params array
     */
    transform(value: number, ...args: any[]): string {
        let dividedValue: number = value;
        let dividedCount: number = -1;

        while (dividedValue >= 1000) {
            dividedValue = value / 1000
            dividedCount++;
        }

        if (dividedCount >= 0) {
            return `${dividedValue.toFixed(1)} ${INITIALS_MAP[dividedCount]}`;
        }

        return value.toString();
    }
}