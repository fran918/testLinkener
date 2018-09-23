import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DefaultService } from '../api';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  // get information to display in the table
  @Input() info = [];
  @Output() valueChange = new EventEmitter();
  // tslint:disable-next-line:no-inferrable-types
  loading: boolean = false;
  index;
  constructor(
    private defaultService: DefaultService
  ) {
  }

  // this call everytimes that the user key up
  // refresh the data in the DB and refresh the chart
  refresh(data, i) {
    this.index = i;
    this.loading = true;
    // update data in the DB
    this.defaultService.readingPut(data).subscribe(() => {
      // when it is complete refresh the chart, and hide the loading spinner

      // tslint:disable-next-line:prefer-const
      let value1 = [];
      // tslint:disable-next-line:prefer-const
      let value2 = [];
      this.info.map((a) => {
        value1.push(a.value1);
        value2.push(a.value2);
      });

      const values = [
        value1,
        value2
      ];
      this.valueChange.emit(values);
      this.loading = false;
    });
  }
  ngOnInit() {
  }

}
