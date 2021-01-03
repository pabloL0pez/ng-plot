import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BarChartComponent } from './bar-chart/bar-chart.component';

const components = [
    BarChartComponent,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: components,
    providers: [],
    exports: [...components],
})
export class NgPlotModule {}