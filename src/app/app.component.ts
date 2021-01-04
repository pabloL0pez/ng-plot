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

    series: string[];
    testData: number[][];
    colors: string[];

    constructor() {
        this.testData = [[1, 2, 3, 4, 5, 6], [1.4, 2.3, 3.1, 4.8, 3, 7]];
        this.series = ["Sol", "Luna", "Tierra", "Alpha", "Beta", "Gamma"];
        this.colors = ["#ef9a9a", "#64b5f6"];
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.barChart.scalePrecision.next(1);
        this.barChart.width = "100%";
        this.barChart.height = "700px";
        this.barChart.barsWidth = "100%";
        this.barChart.seriesGap = 25;
    }
}
