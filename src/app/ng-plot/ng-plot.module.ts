import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NumberTrimPipe } from "./shared/pipes/number-trim.pipe";
import { MathService } from "./shared/services/math.service";

const components = [
    BarChartComponent,
    NumberTrimPipe,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: components,
    providers: [
        MathService,
        NumberTrimPipe,
    ],
    exports: [...components],
})
export class NgPlotModule {}