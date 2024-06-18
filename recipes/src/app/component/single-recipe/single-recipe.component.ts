import { Component , EventEmitter, Input, Output,OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Recipes } from '../../shared/models/recipes';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { TimestampProvider } from 'rxjs';
import { TimePipe } from '../../shared/pipes/time.pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NgStyle } from '@angular/common';
import { ForDirectiveDirective } from '../../shared/directives/for-directive.directive';
@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [NgFor,CommonModule,TimePipe,MatCardModule,MatButtonModule,ForDirectiveDirective],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.scss'
})
export class SingleRecipeComponent {
  @Input('singleRecipe')
 recipe:Recipes|undefined=undefined;
  url:string='';
 constructor() {
  console.log(this.recipe);
 }
 
 ngOnInit(){
  console.log('ngOnInit',this.recipe);
  
    if(!this.recipe?.imagUrl)
    this.url='https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_640.jpg'
    else{
      this.url=`http://localhost:5000/images/${this.recipe?.imagUrl}`
    }
    console.log(this.url);
    
    console.log('url=',this.url);
    
 }
 
 
}
