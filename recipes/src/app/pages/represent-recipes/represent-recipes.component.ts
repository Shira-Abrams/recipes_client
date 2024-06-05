import { Component, EventEmitter, Input, Output ,OnInit} from '@angular/core';
import { RecipeServiceService } from '../../shared/services/recipes/recipe-service.service';
import { Recipes } from '../../shared/models/recipes';
import { NgFor, NgStyle } from '@angular/common';
import { SingleRecipeComponent } from '../../component/single-recipe/single-recipe.component';
import { NgModel } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SearchPipesPipe } from '../../shared/pipes/search-pipes.pipe';
import { PaginPipesPipe } from '../../shared/pipes/pagin-pipes.pipe';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategorieServiceService } from '../../shared/services/categories/categorie-service.service';
import { Categories } from '../../shared/models/categories';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-represent-recipes',
  standalone: true,
  imports: [NgFor,SingleRecipeComponent
    ,NgStyle,CommonModule,
    RouterLink,FormsModule,
    SearchPipesPipe,PaginPipesPipe,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './represent-recipes.component.html',
  styleUrl: './represent-recipes.component.scss'
})
export class RepresentRecipesComponent implements OnInit{

  searchaValue=''
  timePrepertaion=0;
  rank=1
  StartPage:number=1
  mountOfpage:number=3;
  @Input()
  recipes:Recipes[]=[];
  
  temRecipes:Recipes[]=[];
  allCategories:Categories[]=[]

  selectedCategories='סנן לפי קטגוריה'
  isOpenFilter=false
 constructor(private recipeService:RecipeServiceService,router:Router,private categoriesServices:CategorieServiceService ) {
   
  //  categoriesServices.getAllCategories().subscribe(data=>{
  //          console.log('categories=',data);
  //          this.allCategories=data;
           
  //  })

 }
  

 nextPage(){
    if(this.StartPage*this.mountOfpage<=this.recipes.length)
     this.StartPage++;
 }
 prevPage()
 {
    if(this.StartPage>1)
      this.StartPage--;
 }

 filterByCategory()
 {   
     console.log('at filterByCategory');
     console.log('the value is :',this.selectedCategories);
     
      console.log(this.recipes);
      console.log('--------------------------');
         this.categoriesServices.getCategoriesByIdAndRecipe(this.selectedCategories).subscribe(data=>{
           console.log('filter by category= ',data.recipes);
           this.recipes=data.recipes; 
           console.log(this.recipes);
         })

 
 }

 filterBYTime()
 { 
   console.log('at filterBYTime time is = ' ,this.timePrepertaion);
   
   this.recipes=  this.recipes.filter(x=>x.preperationTime==this.timePrepertaion)
 }
 filterByRank()
 {     
   console.log('at filterByRank the rank is :' ,this.rank);
   
     this.recipes=  this.recipes.filter(x=>x.difficulty==this.rank)
 }

 
 ngOnInit(): void {
  console.log('at represent recipe the the recipe is ',this.recipes);
  
}
}

