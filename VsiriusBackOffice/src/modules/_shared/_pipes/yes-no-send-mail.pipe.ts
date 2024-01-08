import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNoSendMail'
})
export class YesNoSendMailPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? "Email sent" : "";
  }

}
