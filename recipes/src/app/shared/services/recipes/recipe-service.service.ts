import { HttpClient } from '@angular/common/http';
import {inject, Injectable } from '@angular/core';
import {Recipes} from '../../models/recipes'
import { User } from '../../models/user';
@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
  private http=inject(HttpClient);
  private baseRecipsURl='http://localhost:5000/recipes'
  constructor() { }
  getAllRecipe(){
    return this.http.get<Recipes[]>(`${this.baseRecipsURl}/getAllRecipes`)
  }
  getRecipeById(id:String){
    return this.http.get<Recipes>(`${this.baseRecipsURl}/getRecipeByCode/${id}`)
  }

getRecipesByUSer(userId:string){
  return this.http.get<Recipes[]>(`${this.baseRecipsURl}/getRecipesByUser/${userId}`)
}

getRecByPTime(pt:number)
{
  return this.http.get<Recipes[]>(`${this.baseRecipsURl}/getRecipesByPreperationTime/${pt}`)
}

addRecipes(user2Add:User)
{
  return this.http.post<Recipes>(`${this.baseRecipsURl}/addrecipe`,user2Add)
}
updateRecipes(id:string,updatedUser:User){
  return this.http.put<Recipes>(`${this.baseRecipsURl}/updateRecipes/${id}`,updatedUser)
}

deleteRecipe(id:string){
  this.http.delete(`${this.baseRecipsURl}/deleteRecip/${id}`)
}
}
