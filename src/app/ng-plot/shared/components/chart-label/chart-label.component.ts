import { Component, Input, OnInit } from '@angular/core';
import { NumberTrimPipe } from '../../pipes/number-trim.pipe';

@Component({
    selector: 'ng-chart-label',
    templateUrl: './chart-label.component.html',
    styleUrls: ['./chart-label.component.scss']
})
export class ChartLabelComponent implements OnInit {

    @Input()
    color: string = "#ffffff";
    @Input()
    series: string = "Series";
    @Input()
    label: string = "Label";
    @Input()
    data: number = 0;
    @Input()
    backgroundColor: string = "#212121";

    constructor(
        private numberTrimPipe: NumberTrimPipe,
    ) { }

    ngOnInit(): void {
    }
}
