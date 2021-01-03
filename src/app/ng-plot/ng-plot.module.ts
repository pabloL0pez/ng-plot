import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { MathService } from "./services/math.service";

const components = [
    BarChartComponent,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: components,
    providers: [
        MathService,
    ],
    exports: [...components],
})
export class NgPlotModule {}