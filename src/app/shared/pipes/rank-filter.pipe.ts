import { Pipe, PipeTransform } from '@angular/core';
import { Recipes } from '../models/recipes';
@Pipe({
  name: 'rankFilter',
  standalone: true
})
export class RankFilterPipe implements PipeTransform {

  transform(recipes: Recipes[], rank:number): Recipes[] {
     return  recipes.filter(x=>x.difficulty==rank)
   }

}
