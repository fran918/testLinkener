import { Injectable } from '@angular/core';
import { Chart } from '../interfaces/chart';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  options: Chart;


  constructor(
  ) {

  }

  // receive the basic data, and the type of labels
  // return the complete configuration for the chart
  getInfo(data, type) {
    const info = {
      title: {
        text: data.title,
        align: 'left'
      },
      chart: {
        type: data.type
      },
      xAxis: {
        type: 'datetime',
        categories: data.time,
        labels: {
          formatter: function () {

            let fecha;
            switch (type) {
              case 'days':
                fecha = new Date(this.value).getDate().toString() + '/' +
                  new Date(this.value).getMonth().toString();
                break;
              case 'hours':
                fecha = new Date(this.value).getHours().toString() + ':' +
                  new Date(this.value).getSeconds().toString();
                break;
              default:
                fecha = new Date(this.value).getHours().toString() + ':' +
                  new Date(this.value).getSeconds().toString();
                break;
            }

            return fecha;
          },
          rotation: 0.1,
          align: 'left',
          step: Math.floor(data.time.length / 10),
          enabled: true
        }
      },
      legend: {
        align: 'left',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        symbolWidth: 10
      },
      series: data.data,
      plotOptions: data.plotOptions
    };
    return info;
  }

  // convert hex color value to RGBA value
  hexToRgba(hex, alpha) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    // tslint:disable-next-line:max-line-length
    return result ? 'rgba(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ',' + (alpha || 0) + ')' : null;
  }

}
