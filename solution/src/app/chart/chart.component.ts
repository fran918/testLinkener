import { Component, OnInit } from '@angular/core';
import { ChartService } from '../services/chart.service';
import { DefaultService } from '../api';
import { Chart, Highcharts } from 'angular-highcharts';
import { Interval } from '../../assets/interval';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public chart: any;
  public highChartsOptions: Highcharts.Options;

  public info = [];
  public options;
  private timeChoices = Interval;
  private today = new Date();
  private start = new Date(this.today.getTime() - (1000 * 60 * 60 * 1));
  private end = new Date();
  private type = 'hours';

  public brandTime: any;
  public defaultTime: any;


  public modelChanged(event) {
    this.start = new Date(this.today.getTime() - (event));
    this.getInfo(this.start, this.end, this.type);
  }
  constructor(
    private defaultService: DefaultService,
    private chartService: ChartService) {
    this.defaultTime = this.timeChoices[0];
    this.brandTime = Object.assign(this.defaultTime.label);
  }
  ngOnInit() {
    this.getInfo(this.start, this.end, this.type);
  }

  // refresh and display changes in chart
  public displayChanges(event) {
    for (let i = 0; i < this.options.series.length; i++) {
      this.options.series[i].data = event[i];
    }
    this.chart = new Chart(this.options);
  }

  // get information from DB with a date of start and end, also a type of label to show
  // type could be 'days' in dates, or 'hours'
  public getInfo(start, end, type) {
    this.info = [];
    this.defaultService.readingGet(start, end)
      .subscribe((information) => {

        // save information in different array
        // if you want to add a new column, you have to add a new array here, add it to info array too, also
        // you have to configure it in option.data, adding an item with his configuration, like color, gradient, etc.

        // tslint:disable-next-line:prefer-const
        let value1 = [];
        // tslint:disable-next-line:prefer-const
        let value2 = [];
        // tslint:disable-next-line:prefer-const
        let timestamp = [];
        information.map((element) => {
          value1.push(element.value1);
          value2.push(element.value2);
          timestamp.push(element.timestamp);
          this.info.push(
            {
              id: element.id,
              value1: element.value1,
              value2: element.value2,
              timestamp: element.timestamp
            }
          );
        });

        this.options = this.chartService.getInfo({
          title: 'Values/time',
          type: 'areaspline',
          // add this new data
          data: [
            {
              data: value1,
              name: ' Value1',
              color: '#55d8fe',
              fillColor: {
                linearGradient: {
                  x1: 0,
                  x2: 0,
                  y1: 0,
                  y2: 1
                },
                stops: [
                  [0, '#55d8fe'],
                  [5.2, this.chartService.hexToRgba('#55d8fe', 0)]
                ]
              },
              allowPointSelect: true
            },
            {
              data: value2,
              name: 'Value2',
              color: '#a4a1fb',
              fillColor: {
                linearGradient: {
                  x1: 0,
                  x2: 0,
                  y1: 0,
                  y2: 1
                },
                stops: [
                  [0, '#a4a1fb'],
                  [5.2, this.chartService.hexToRgba('#a4a1fb', 0)]
                ]
              },
              allowPointSelect: true
            }],
          time: timestamp,
          plotOptions: {
            areaspline: {
              marker: {
                // you can change the symbol in the chart here
                symbol: 'circle',
                lineWidth: 2,
                fillColor: 'white',
                lineColor: null,
              }
            }
          }
        }, type);
        // refresh chart with this information
        this.chart = new Chart(this.options);
      });
  }
}
