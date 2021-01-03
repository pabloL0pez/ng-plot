import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BarChartComponent } from './ng-plot/bar-chart/bar-chart.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    @ViewChild("barChart", { static: true })
    barChart: BarChartComponent;

    testData: number[][];

    constructor() {
        this.testData = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]];
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.barChart.scalePrecision.next(1);
    }
}
