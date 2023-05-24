import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCustomComponent } from './input-custom.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [InputCustomComponent],
  exports:[InputCustomComponent],
})
export class InputCustomModule { }
