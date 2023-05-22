import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-select-custom',
  templateUrl: './ng-select-custom.component.html',
  styleUrls: ['./ng-select-custom.component.css']
})
export class NgSelectCustomComponent implements OnInit {

  @Input() listDatas: any[] ;
  @Input() model;
  @Input() label;

  ngOnInit() {
  }
} 
