import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartLabelComponent } from "./components/chart-label/chart-label.component";
import { NumberTrimPipe } from "./pipes/number-trim.pipe";

const components = [
    ChartLabelComponent,
    NumberTrimPipe,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: components,
    providers: [
        NumberTrimPipe
    ],
    exports: components,
})
export class SharedModule {}