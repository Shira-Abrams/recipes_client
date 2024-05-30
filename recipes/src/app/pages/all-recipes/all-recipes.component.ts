import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeServiceService } from '../../shared/services/recipes/recipe-service.service';
import { Recipes } from '../../shared/models/recipes';
import { NgFor } from '@angular/common';
import { SingleRecipeComponent } from '../../component/single-recipe/single-recipe.component';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [NgFor,SingleRecipeComponent],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent {
   
  recipes:Recipes[]=[];
  constructor(private recipeService:RecipeServiceService) {
    recipeService.getAllRecipe().subscribe(data=>{
      this.recipes=data
    })
  }
}
