import { Pipe, PipeTransform,Inject, inject } from '@angular/core';
import { User } from '../models/user';
import { Recipes } from '../models/recipes';
import { HttpClient } from '@angular/common/http';
@Pipe({
  name: 'searchPipes',
  standalone: true
})
export class SearchPipesPipe implements PipeTransform {
  /**
   *
   */
  private baseRecipsURl='http://localhost:5000/recipes'
   http=inject(HttpClient);

  transform(recipes: Recipes[], searchValue:string): Recipes []{
     this.http.get<Recipes[]>(`${this.baseRecipsURl}/getAllRecipes?search=${searchValue}`).subscribe(data=>{
       console.log('dat in searchpip',data)
       return data;
       
     })
     return []
    
  }

}
