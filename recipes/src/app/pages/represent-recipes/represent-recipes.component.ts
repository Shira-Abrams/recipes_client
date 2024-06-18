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
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategorieServiceService } from '../../shared/services/categories/categorie-service.service';
import { Categories } from '../../shared/models/categories';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RankFilterPipe } from '../../shared/pipes/rank-filter.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-represent-recipes',
  standalone: true,
  imports: [NgFor,SingleRecipeComponent
    ,NgStyle,CommonModule,
    RouterLink,FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    RankFilterPipe,
    MatProgressSpinnerModule
  ],
  templateUrl: './represent-recipes.component.html',
  styleUrl: './represent-recipes.component.scss'
})
export class RepresentRecipesComponent implements OnInit{


  searchaValue=''
  timePrepertaion=0;
  rank=0
  StartPage:number=1
  mountOfpage:number=6;
  @Input()
  recipes:Recipes[]=[];
  
  temRecipes:Recipes[]=[];
  allCategories:Categories[]=[]

  selectedCategories=''
  isOpenFilter=false
 constructor(private recipeService:RecipeServiceService,router:Router,private categoriesServices:CategorieServiceService ) {
   
   categoriesServices.getAllCategories().subscribe(data=>{
           console.log('categories=',data);
           this.allCategories=data;
           
   })
   this.temRecipes=[...this.recipes];

 }
  
//  isHasNex()
//  { 
//   this.recipeService.pagin(this.StartPage+1, this.mountOfpage,this.searchaValue).subscribe(data=>{
//      if(data.length!=0)
//       this.StartPage++
//  })
//  }
 nextPage(){
       this.StartPage++;
    if(this.selectedCategories=='')
      {  
        this.recipeService.pagin(this.StartPage, this.mountOfpage,this.searchaValue).subscribe(data=>{
             this.recipes=data;
             console.log('prevPage= ',data);
             if(this.rank!=0&&this.timePrepertaion!=0)
              this.recipes=this.recipes.filter(x=>x.difficulty==this.rank&&x.preperationTime==this.timePrepertaion)
           else{
             if(this.rank!=0)
               this.recipes=this.recipes.filter(x=>x.difficulty==this.rank)
             else{
               if(this.timePrepertaion!=0)
                 this.recipes=this.recipes.filter(x=>x.preperationTime==this.timePrepertaion)

             }
            }
             
          })
      }
      else{
        
          this.recipes.slice((this.StartPage-1)*this.mountOfpage,this.mountOfpage)
      }
    
    
 }
 
 
 prevPage()
 {
    if(this.StartPage>1)
      this.StartPage--;
    if(this.selectedCategories=='')
      {
        this.recipeService.pagin(this.StartPage, this.mountOfpage,this.searchaValue).subscribe(data=>{
             this.recipes=data;
              if(this.rank!=0&&this.timePrepertaion!=0)
                 this.recipes=this.recipes.filter(x=>x.difficulty==this.rank&&x.preperationTime==this.timePrepertaion)
              else{
                if(this.rank!=0)
                  this.recipes=this.recipes.filter(x=>x.difficulty==this.rank)
                else{
                  if(this.timePrepertaion!=0)
                    this.recipes=this.recipes.filter(x=>x.preperationTime==this.timePrepertaion)

                }

              }
             console.log('prevPage= ',data);
             
            })
      }
      else{
          this.recipes.slice((this.StartPage-1)*this.mountOfpage,this.mountOfpage)
      }
      
 }

 filterByCategory()
 {   
     console.log('at filterByCategory');
     console.log('the value is :',this.selectedCategories);
       this.StartPage=1
      console.log(this.recipes);
      console.log('--------------------------');
         this.categoriesServices.getCategoriesByIdAndRecipe(this.selectedCategories).subscribe((data:Categories)=>{         
            console.log('filter by category all data is equal = ',data);

           console.log('filter by category= ',data.recipes);
             
           this.recipes=data.recipes; 
           this.temRecipes=data.recipes
           console.log(this.recipes);
         })
 }

 filterBYTime()
 {  
  
    
 }
 filterByRank()
 {     
    this.StartPage=1
   console.log('at filterByRank the rank is :' ,this.rank);
    if(this.timePrepertaion==0)
      {
          this.recipes=  this.recipes.filter(x=>x.difficulty==this.rank)
          console.log();
                                                                                                       

      }
     else{
       this.recipes=this.recipes.filter(x=>x.difficulty==this.rank&&x.preperationTime==this.timePrepertaion)
     }
 }

 
 ngOnInit() {
  console.log('at represent recipe the the recipe is ',this.recipes);
  this.temRecipes=[...this.recipes];
    console.log('at represent recipe the the temp-recipe  is ',this.temRecipes);
  
  
}

filterBySearch() { 
     this.StartPage=1;

    this.recipeService.getRecipeBySearch(this.searchaValue).subscribe(data=>{
      this.recipes=data;
    })
  }

 
}

