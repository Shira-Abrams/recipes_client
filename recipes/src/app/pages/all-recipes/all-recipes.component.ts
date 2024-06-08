import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeServiceService } from '../../shared/services/recipes/recipe-service.service';
import { Recipes } from '../../shared/models/recipes';
import { Router } from '@angular/router';
import { CategorieServiceService } from '../../shared/services/categories/categorie-service.service';
import { RepresentRecipesComponent } from '../represent-recipes/represent-recipes.component';
@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [
    RepresentRecipesComponent
  ],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent {
   
   recipes:Recipes[]=[];


   selectedCategories='סננ לפי קטגוריה'
   isOpenFilter=false
  constructor(private recipeService:RecipeServiceService,router:Router ) {
    recipeService.getAllRecipe().subscribe(data=>{
      this.recipes=data
       console.log('data in all recipes',data);
        
    })
   
  }
  
}
