import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ng-select-custom',
  templateUrl: './ng-select-custom.component.html',
  styleUrls: ['./ng-select-custom.component.css']
})
export class NgSelectCustomComponent implements OnInit {

  @Input() listDatas: any[] ;
  @Input() model;
  @Input() label;

  @Output() ngModelChange = new EventEmitter<any>();

 
  ngOnInit() {
    // console.log(this.model);
  }
  onSelectedValueChange(event) {
    this.ngModelChange.emit(event);
    console.log(event);
  }

} 
