import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value == null)
      return null;
    const countryCodeStr = value.slice(0, 2);
    const areaCodeStr = value.slice(2, 5);
    const midSectionStr = value.slice(5, 8);
    const lastSectionStr = value.slice(8);

    return `${countryCodeStr} (${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
  }
}
