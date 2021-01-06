import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NumberTrimPipe } from '../pipes/number-trim.pipe';
import { MathService } from '../services/math.service';
import { BarChartMode, HoverMap, PrecisionValue, TitleAlignment } from '../shared/types';

@Component({
    selector: 'ng-plot-bar',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent implements OnInit {

    /** The title of the chart */
    @Input()
    title: string = "Bar chart";
    /** The color of the chart series. Each color index corresponds to the same index of that series. */
    @Input()
    colors: string[] = [];
    /** The color of the chart series, when hovered. Each color index corresponds to the same index of that series. */
    @Input()
    hoverColors: string[] = [];
    /**
     * The opacity of the bar series. Each level of opacity index corresponds to the same index of that series.
     * 
     * The value `0.8` is used by default on all series.
     */
    @Input()
    seriesOpacity: number[] = [];
    /** The chart series. */
    @Input()
    series: any[] = [];
    /** The data corresponding to each series. Each data index corresponds to the same index of that series. */
    @Input()
    data: number[][] = [];
    /** The labels for each series. Each label index corresponds to the same index of that series. */
    @Input()
    labels: string[][] = [];
    /** The color of the chart grid. The color `#757575` is used by default. */
    @Input()
    gridColor: string = "#b0bec5";
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
    @Input()
    height: string = "400px";
    /** The width of the chart. By default the chart is plotted with enough width to fit the content. */
    @Input()
    width: string = "fit-content";
    /** Indicates if number trimming should be used for big numbers. For example:
     * 
     * - `1.000` becomes `1K`
     * - `250.000` becomes `250K`
     * - `1.000.000` becomes `1M`
     * - `1.000.000.000` becomes `1B`
     * 
     * By default, this property is set to `true`.
     */
    @Input()
    useNumberTrimming: boolean = true;


    /** The padding of the chart container. 
     * 
     * Any CSS unit can be used. For example:
     * 
     * - `25px`
     * - `10px 15px`
     * - `1rem 0rem 2rem 0rem`
     * 
     * `25px 100px 10px 25px` of padding is used by default.
    */
    padding: string = "25px 100px 10px 25px";
    /** The background color of the chart. The color `#eceff1` is used by default. */
    backgroundColor: string = "#eceff1";
    /** The color of the series and the Y axis labels. The color `#616161` is used by default. */
    seriesLabelsColor: string = "#616161"
    /** 
     * The precision value to be used in the Y axis scale values, up to a precision value of `10`.
     * 
     * The default value is `2`.
     */
    scalePrecision: BehaviorSubject<PrecisionValue> = new BehaviorSubject<PrecisionValue>(2);
    /** The width of the chart bars, in pixels. The default value is `50`. */
    barsWidth: string = "50px";
    /** 
     * The gap between each bar for a single series, in pixels. The default value is `3`.
     */
    barsGap: number = 3;
    /** The gap between each set of bars corresponding to a series, in pixels. The default value is `10` */
    seriesGap: number = 10;
    /** The font size of the series labels. The default value is `18px` */
    seriesFontSize: string = "18px";
    /** The font size of the chart title. The default value is `36px` */
    titleFontSize: string = "36px";
    /** The alignment of the chart title. The default value is `left` */
    titleAlignment: TitleAlignment = "left";


    /** The Y axis scale values. */
    _yAxisScale: number[];
    /** The height percentage of each bar corresponding to it's value in the dataset. */
    _barsHeightMap: string[][];
    /** The height percentage of each Y axis label corresponding to it's value in the dataset. */
    _yAxisHeightMap: string[];
    /** Indicates which data record is beign hovered on. */
    _hoverMap: HoverMap = {
        i: -1,
        j: -1,
    };

    constructor(
        private mathService: MathService,
        private numberTrimPipe: NumberTrimPipe,
    ) { }

    ngOnInit(): void {
        this.scalePrecision.asObservable().subscribe(newValue => {
            this._yAxisScale = this.__getYAxisScale__(this.data);
            this._barsHeightMap = this.__getBarsHeightMap__(this.data);
            this._yAxisHeightMap = this.__getYAxisHeightMap__(this._yAxisScale);
            console.log(this._barsHeightMap);
            console.log(this._yAxisHeightMap);
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

    /**
     * Maps a numeric value of the dataset to a percentage value relative to the max or min value (respectively) of the whole dataset.
     * @param value the value
     */
    private __mapValueToPercentageHeight__(value: number): string {
        return `${(this.mathService.getRelativePercentage(value, value >= 0 ? this._yAxisScale[this._yAxisScale.length - 1] : this._yAxisScale[0]) * 100).toFixed(0)}%`;
    };

    /**
     * Returns the bars height map.
     * @param data the dataset
     */
    private __getBarsHeightMap__(data: number[][]): string[][] {
        let barsHeightMap: string[][] = [];

        for (let i = 0 ; i < this.data.length ; i++) {
            let rowValues: string[] = [];

            for (let j = 0 ; j < this.data[i].length ; j++) {
                rowValues.push(this.__mapValueToPercentageHeight__(this.data[i][j]));
            }

            barsHeightMap.push(rowValues);
        }

        return barsHeightMap;
    }

    private __getYAxisHeightMap__(scale: number[]): string[] {
        let yAxisHeightMap: string[] = [];

        for (let value of scale) {
            yAxisHeightMap.push(this.__mapValueToPercentageHeight__(value));
        }

        return yAxisHeightMap
    }
}
