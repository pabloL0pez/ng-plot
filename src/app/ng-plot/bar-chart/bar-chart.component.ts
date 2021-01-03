import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type BarChartMode = "vertical" | "horizontal";
type PrecisionValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

@Component({
    selector: 'ng-plot-bar',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

    /** The color of the chart series. Each color index corresponds to the same index of that series. */
    @Input()
    color: string[] = [];
    /** The chart series. */
    @Input()
    series: any[][] = [];
    /** The data corresponding to each series. Each data index corresponds to the same index of that series. */
    @Input()
    data: number[][] = [];
    /** The labels for each series. Each label index corresponds to the same index of that series. */
    @Input()
    labels: string[][] = [];
    /** The color of the chart grid. The color `#78909c` is used by default. */
    @Input()
    gridColor: string;
    /** Indicates if the bars should be plotted horizontally or vertically. */
    @Input()
    mode: BarChartMode;
    /** Flag that indicates if the bars of the chart should be stacked or not.
     * 
     * Use `true` for a stacked bar chart, or `false` otherwise.
     * 
     * By default, the bars are not stacked.
     */
    @Input()
    stacked: boolean = false;
    /** 
     * Step used when calculating the Y axis scale values.
     * 
     * A smaller step results in more values beign displayed in the Y axis, and visceversa.
     */
    @Input()
    step: number = 1;

    /** The height of the chart. By default the chart is plotted with enough height to fit the content. */
    height: string = "fit-content";
    /** The width of the chart. By default the chart is plotted with enough width to fit the content. */
    width: string = "fit-content";
    /** The padding of the chart container. 
     * 
     * Any CSS unit can be used. For example:
     * 
     * - `25px`
     * - `10px 15px`
     * - `1rem 0rem 2rem 0rem`
     * 
     * `10px` of padding is used on all sides by default.
    */
    padding: string = "10px";
    /** The background color of the chart. The color `#eceff1` is used by default */
    backgroundColor: string = "#eceff1";
    /** 
     * The precision value to be used in the Y axis scale values, up to a precision value of `10`.
     * 
     * The default value is `2`.
     */
    scalePrecision: BehaviorSubject<PrecisionValue> = new BehaviorSubject<PrecisionValue>(2);
    /** The Y axis scale values. */
    _yAxisScale: number[];

    constructor() { }

    ngOnInit(): void {
        this.scalePrecision.asObservable().subscribe(newValue => {
            this._yAxisScale = this.__getYAxisScale__(this.data);
            console.log(this._yAxisScale);
        });
    }

    /**
     * Returns the Y axis scale, which is calculated in relation to the dataset to plot.
     * @param data the dataset
     */
    private __getYAxisScale__(data: number[][]): number[] {
        let scaleValues: number[] = [];
        let _min: number = Number.MAX_SAFE_INTEGER;
        let _max: number = Number.MIN_SAFE_INTEGER;
        let _sumPositives: number = 0;
        let _sumNegatives: number = 0;
        let _countPositives: number = 0;
        let _countNegatives: number = 0;

        // First, we find:
        // - the min and max values
        // - the total ammount of positive and negative values
        // - the sum of all positive and negative values
        for (let i = 0 ; i < data.length ; i++) {
            for (let j = 0 ; j < data[i].length ; j++) {
                let currentValue = data[i][j];

                if (currentValue >= 0) {
                    _sumPositives += currentValue;
                    _countPositives++;
                } else {
                    _sumNegatives += currentValue;
                    _countNegatives++;
                }

                if (currentValue > _max) {
                    _max = currentValue;
                }

                if (currentValue < _min) {
                    _min = currentValue;
                }
            }
        }

        // Then, depending of wether negative values are present or not, we get the scale values
        // by calculating the average value of the dataset, dividing the scale values into 1 or 2 groups
        if (_sumPositives > 0) {
            let scaleTop: number = 0;
            let _positivesAverage: number = _sumPositives / _countPositives;

            if (_sumNegatives < 0) {
                let scaleBottom: number = 0;
                let _negativesAverage: number = _sumNegatives / _countNegatives;
                
                while (scaleBottom > _min) {
                    scaleBottom += _negativesAverage * this.step;
                    scaleValues.push(Number.parseFloat(scaleBottom.toFixed(this.scalePrecision.value)));
                }
            }

            scaleValues.push(0);

            while (scaleTop < _max) {
                scaleTop += _positivesAverage * this.step;
                scaleValues.push(Number.parseFloat(scaleTop.toFixed(this.scalePrecision.value)));
            }
        }

        return scaleValues;
    }
}
