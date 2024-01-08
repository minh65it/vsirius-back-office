import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yesNo.pipe';
import { YesNoSendMailPipe } from './yes-no-send-mail.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [YesNoPipe,
    YesNoSendMailPipe
  ],
  exports: [YesNoPipe,
    YesNoSendMailPipe
  ]
})
export class SharePipeModule { }
