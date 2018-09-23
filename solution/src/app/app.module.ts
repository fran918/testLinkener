import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// HIGHCHART LIBRARY
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';

// SERVICES
import { ChartService } from './services/chart.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { TableComponent } from './table/table.component';

// API
import { ApiModule } from './api';

// ANGULAR EXTRAS
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// DIRECTIVES
import { EditableDivDirective } from './directives/editable-div.directive';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    TableComponent,
    EditableDivDirective
  ],
  imports: [
    ApiModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ChartModule
  ],
  providers: [ChartService,
    {
      provide: HighchartsStatic,
      useValue: highcharts
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
