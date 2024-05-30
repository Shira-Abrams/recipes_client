import { Component , EventEmitter, Input, Output,OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Recipes } from '../../shared/models/recipes';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [NgFor,],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.scss'
})
export class SingleRecipeComponent {
  @Input('singleRecipe')
 recipe:Recipes|undefined=undefined;
 rank=this.recipe?.difficulty
 rnakArray:number[]=new Array(5)
 
 constructor() {
  console.log(this.rnakArray.length,this.recipe?.difficulty);
  
 }
}
