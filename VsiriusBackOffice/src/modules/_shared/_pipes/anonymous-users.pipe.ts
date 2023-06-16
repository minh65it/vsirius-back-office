import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'anonymousUsers'
})
export class AnonymousUsersPipe implements PipeTransform {

  transform(value: string): string | null {
    return value == null ? 'Anonymous users' : value;
  }

}
