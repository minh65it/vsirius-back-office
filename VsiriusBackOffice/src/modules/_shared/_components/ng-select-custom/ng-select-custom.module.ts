import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectCustomComponent } from './ng-select-custom.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
  ],
  declarations: [NgSelectCustomComponent],
  exports:[
    NgSelectCustomComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgSelectCustomModule { }
