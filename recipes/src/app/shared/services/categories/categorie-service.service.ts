import { HttpClient } from '@angular/common/http';
import {inject ,Injectable } from '@angular/core';
import { Categories } from '../../models/categories';
@Injectable({
  providedIn: 'root'
})
export class CategorieServiceService {
  private http=inject(HttpClient);
  private baseCategoryUrl='http://localhost:5000/categories'
  constructor() { }
  getAllCategories(){
    return this.http.get<Categories[]>(`${this.baseCategoryUrl}/getallcategories`)
  }
  getAllCategoriesAndRecipes(){
    return this.http.get<Categories[]>(`${this.baseCategoryUrl}/getAllCategoriesAndRecipe`)
  }
  getCategoriesByIdAndRecipe(id:string){
    return this.http.get<Categories>(`${this.baseCategoryUrl}/getCategoryByIdWithRec/${id}`)
  }
}
