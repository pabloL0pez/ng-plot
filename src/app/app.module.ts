import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { NgPlotModule } from './ng-plot/ng-plot.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgPlotModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
