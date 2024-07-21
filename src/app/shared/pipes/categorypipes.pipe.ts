import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorypipes',
  standalone: true
})
export class CategorypipesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
