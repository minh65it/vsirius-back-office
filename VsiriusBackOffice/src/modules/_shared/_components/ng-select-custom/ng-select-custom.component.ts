import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ng-select-custom',
  templateUrl: './ng-select-custom.component.html',
  styleUrls: ['./ng-select-custom.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgSelectCustomComponent),
      multi: true,
    }
  ]
})
export class NgSelectCustomComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() listDatas: any[];

  @Input() isValidate:boolean;
  selectedItem: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {}

  writeValue(value: any): void {
    this.selectedItem = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSelectionChange(value: any) {
    this.selectedItem = value;
    this.onChange(value);
    this.onTouched();
  }
  // @Input() label: string;
  // @Input() listDatas: string[];
  // @Output() selectionChanged: EventEmitter<string> = new EventEmitter<string>();

  // selectedValue: any;

  // onSelectionChange(e:any) {
  //   this.selectionChanged.emit(e);
  // }
}
