import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';
import { Recipes } from '../models/recipes';

@Pipe({
  name: 'searchPipes',
  standalone: true
})
export class SearchPipesPipe implements PipeTransform {

  transform(recipes: Recipes[], searchValue:string): Recipes []{
    return recipes.filter(x=>x.name.includes(searchValue))
  }

}
