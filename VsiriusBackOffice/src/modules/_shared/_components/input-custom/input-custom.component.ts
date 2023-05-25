import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-custom',
  templateUrl: './input-custom.component.html',
  styleUrls: ['./input-custom.component.css']
})
export class InputCustomComponent implements OnInit {
  @Input() model;
  @Input() label;
  @Input() isValidate:boolean;
  @Output() valueChanged = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  onInputChange(value: any) {
    this.valueChanged.emit(value.target.value);
  }

}
