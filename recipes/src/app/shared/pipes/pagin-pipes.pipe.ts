import { Pipe, PipeTransform } from '@angular/core';
import { Recipes } from '../models/recipes';

@Pipe({
  name: 'paginPipes',
  standalone: true
})
export class PaginPipesPipe implements PipeTransform {

  transform(value: Recipes[], startIndex: number,endIndex:number): Recipes[] {
     return value.slice(startIndex,endIndex);
  }

}
