import { HttpClient } from '@angular/common/http';
import {inject, Injectable } from '@angular/core';
import {Recipes} from '../../models/recipes'
import { User } from '../../models/user';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserServiceService } from '../user/user-service.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
  private http=inject(HttpClient);
  private baseRecipsURl='http://localhost:5000/recipes'
  // private recipesUser$:BehaviorSubject<Recipes[]>=new BehaviorSubject<Recipes[]>([]);
  private userRecipe:Recipes[]=[];
  private filteredRecipes:Recipes[]=[]
  imageFile?:File;
  constructor(private router:Router) { 
     
  }
  getAllRecipe(){
    return this.http.get<Recipes[]>(`${this.baseRecipsURl}/getAllRecipes`)
  }
 getRecipeBySearch(searchValue:string)
 {
   return this.http.get<Recipes[]>(`${this.baseRecipsURl}/getAllRecipes?search=${searchValue}`)
     
    
 }
  getRecipeById(id:String|undefined){
    return this.http.get<Recipes>(`${this.baseRecipsURl}/getRecipeByCode/${id}`)
  }

getRecipesByUSer(userId:string){
  return this.http.get<Recipes[]>(`${this.baseRecipsURl}/getRecipesByUser/${userId}`);
}

getRecByPTime(pt:number)
{
  return this.http.get<Recipes[]>(`${this.baseRecipsURl}/getRecipesByPreperationTime/${pt}`)
}

addRecipes(user2Add:FormData)
{
   this.http.post<Recipes>(`${this.baseRecipsURl}/addrecipe`,user2Add).subscribe(data=>{
     this.userRecipe.push(data);
     console.log('recipe user after addin recipe',this.userRecipe);
     
  })

}
updateRecipes(id:string,updatedRecipe:FormData){
  return this.http.put<Recipes>(`${this.baseRecipsURl}/updateRecipes/${id}`,updatedRecipe)
}

deleteRecipe(id:string){
  this.http.delete(`${this.baseRecipsURl}/deleteRecipe/${id}`).subscribe(data=>{
    this.userRecipe= this.userRecipe.filter(x=>x._id!=id)
  })
  this.router.navigateByUrl('')
}

 pagin(startPage:number,mountPage:number,searchValue:string)
 {
    return this.http.get<Recipes[]>(`${this.baseRecipsURl}/getAllRecipes?perPage=${mountPage}&page=${startPage}&search=${searchValue}`)
 }
 public get filtered_recipe()  {
  return this.filteredRecipes
 }
 
 public get userRecipes()  {
  return this.userRecipe;
 }
 
 public set image_file(v : any) {
  this.imageFile=v;
 }
 public get image_file():any{
    return this.imageFile
}
 
}


