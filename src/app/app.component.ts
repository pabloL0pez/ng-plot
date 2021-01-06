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
        this.testData = [
            [15000, 50000, 100000, 150000, 200000, 250000, 300000, 250000],
            [25000, 60000, 300000, 250000, 100000, 150000, 200000, 450000],
            [55000, 70000, 100000, 750000, 500000, 450000, 100000, 350000],
        ];
        this.series = ["Sol", "Luna", "Tierra", "Alpha", "Beta", "Gamma", "Satélite", "Galaxia"];
        this.colors = ["#ef9a9a", "#4caf50", "#2196f3"];
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.barChart.scalePrecision.next(0);
        this.barChart.width = "100%";
        this.barChart.height = "700px";
        this.barChart.barsWidth = "100%";
        this.barChart.seriesGap = 25;
    }
}
