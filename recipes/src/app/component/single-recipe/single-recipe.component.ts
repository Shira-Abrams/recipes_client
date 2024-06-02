import { Component , EventEmitter, Input, Output,OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Recipes } from '../../shared/models/recipes';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TimestampProvider } from 'rxjs';
import { TimePipe } from '../../shared/pipes/time.pipe';
@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [NgFor,CommonModule,TimePipe],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.scss'
})
export class SingleRecipeComponent {
  @Input('singleRecipe')
 recipe:Recipes|undefined=undefined;
  rank=this.recipe?.difficulty
  rnakArray:number[]= []
  url:string='';
 constructor() {
  console.log(this.recipe);
 }
 
 ngOnInit(){
  console.log('ngOnInit',this.recipe);
  
    this.rnakArray=Array(this.recipe?.difficulty).fill(0);
    this.url=this.recipe?.imagUrl||'https://www.hersheyland.com/content/dam/hersheyland/en-us/recipes/recipe-images/2_Hersheys_Perfectly_Chocolate_Cake_11-18.jpeg?im=Resize=(1920)'
 }
 
 
}
