import { OrderProcessor } from '../../../_shared/_models/order-processor/orderProcessor';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/modules/_shared/_helpers/pagination-utility';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  listVsiriusOrder: OrderProcessor[] = [];
  _selectedColumns: any[];
  activityValues: number[] = [0, 100];

  searchFrom: Date = null;
  searchTo: Date = null;
  keyword: string = "";

  pagination: Pagination = <Pagination>{
    pageNumber: 1,
    pageSize: 10,
  };
  cols: any[];


  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }




  search() { }

  detail(item: OrderProcessor) { }
  pageChanged(event: any) { }

  submitLink() {
    this.router.navigate(['/orders-processor/submit-qgold'])
  }
}
