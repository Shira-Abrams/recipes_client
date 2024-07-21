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
import {MatSnackBar} from '@angular/material/snack-bar';
import { UserServiceService } from '../../shared/services/user/user-service.service';
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
    MatProgressSpinnerModule,
    
  ],
  templateUrl: './represent-recipes.component.html',
  styleUrl: './represent-recipes.component.scss'
})
export class RepresentRecipesComponent implements OnInit{

  searchaValue=''
  timePrepertaion=120;
  rank=5
  StartPage:number=1
  mountOfpage:number=6;
  flag=true
  @Input()
  recipes:Recipes[]=[];
  @Input()
  source:string='';

  temRecipes:Recipes[]=[];
  allCategories:Categories[]=[]

  selectedCategories='';
  isOpenFilter=false;
  isFiltered=false;
 constructor(private recipeService:RecipeServiceService,router:Router,private categoriesServices:CategorieServiceService ,private _snackBar: MatSnackBar,private userService:UserServiceService) {
   
   categoriesServices.getAllCategories().subscribe(data=>{
           console.log('categories=',data);
           this.allCategories=data;
           
   })
   this.temRecipes=[...this.recipes];
   console.log('source component =',this.source);
   
 }
  

 nextPage(){

     this.StartPage++;
    if(this.source=='all-recipes')
      {
        if(this.isFiltered) 
          this.filter();
         else{
            this.recipeService.pagin(this.StartPage,this.mountOfpage,this.searchaValue).subscribe(data=>{
              this.recipes=data;
            })  
           this.isHasNext(); 
         }
      }
      else{
        this.userFilter();
      }
     
    
 }
 
 
 prevPage()
 {        
     this.StartPage--;
  
     if(this.source=='all-recipes')
        {
         if(this.isFiltered) 
           this.filter();
          else{
             this.recipeService.pagin(this.StartPage,this.mountOfpage,this.searchaValue).subscribe(data=>{
               this.recipes=data;
             })  
           this.isHasNext(); 
          }  
      
        }
        else{
           this.userFilter();
        }
     
 }

 



 ngOnInit() {
  console.log('at represent recipe the the recipe is ',this.recipes);
  this.temRecipes=[...this.recipes];
    console.log('at represent recipe the the temp-recipe  is ',this.temRecipes);
  console.log('on init this.source =' ,this.source);
  
  
}

filterBySearch() { 
   if(this.source=='all-recipes')
    {
      if(this.isFiltered)
        this.filter();
      else{
        this.recipeService.pagin(1,6,this.searchaValue).subscribe(data=>{
          this.recipes=data;
        })
      }
  
      this.isHasNext()
    }
    else{
      this.userFilter();
    }
    

  }

  cleanFilter() {
    console.log('at clenFilter filter this.source',this.source);
    
    if(this.source=='all-recipes')
      {
        this.recipeService.pagin(1,6,this.searchaValue).subscribe(data=>{
          this.recipes=data
        })
        console.log('all-recipes at cleanFilter the source  ',this.source);

      }
      else{
        console.log('at cleanFilter  the source',this.source);
        
         this.recipes=this.recipeService.userRecipes;
      }
     
      this.isFiltered=false
      this.isOpenFilter=false
      this.selectedCategories='';
      this.rank=5;
      this.timePrepertaion=120
      this.flag=true;
     // this.StartPage=1;
  }

  includeCategory(categories:string[])
  {
      for(let cat of categories)
      {
        if( cat.includes(this.selectedCategories)) 
          return true
      }
      return false
  }
    filter() {
       this.flag=true;
       
          this.recipeService.pagin(1,1000000,this.searchaValue).subscribe(data=>{
            this.recipes=data;
            this.recipes=this.recipes.filter(x=>x.difficulty<=this.rank&&x.preperationTime<this.timePrepertaion&&this.includeCategory(x.categories)&&x.name.includes(this.searchaValue))
             if(this.recipes.length<=(this.StartPage*this.mountOfpage))
              this.flag=false
             this.recipes=this.recipes.slice((this.StartPage-1)*this.mountOfpage,((this.StartPage-1)*this.mountOfpage)+this.mountOfpage)
            console.log('at flter filtered array is =', this.recipes);
               
          })
       this.isOpenFilter=false
    }
    userFilter()
    { 
      this.flag=true;
      console.log('at source =',this.source);
      console.log('at userFilter userFilter this.sourece= ',this.source);
      this.isOpenFilter=false
      this.flag=true;
      console.log('at user filter user-recies before filter is =', this.recipeService.userRecipes);
      
      this.recipes= this.recipeService.userRecipes.filter(x=>x.difficulty<=this.rank&&x.preperationTime<this.timePrepertaion&&this.includeCategory(x.categories)&&x.name.includes(this.searchaValue))
      if(this.recipes.length<=(this.StartPage*this.mountOfpage))
        this.flag=false
      this.recipes.slice((this.StartPage-1)*this.mountOfpage,((this.StartPage-1)*this.mountOfpage)+this.mountOfpage);
       console.log('this.recipes ==', this.recipes);
       
    }
     isHasNext()
     {   
          this.flag=true;
          this.recipeService.pagin(this.StartPage+1,this.mountOfpage,this.searchaValue).subscribe(data=>{
            if(data.length==0)
              this.flag=false;
             console.log('at check next pagin data.length ==',data.length);
             
          })
       
     }

     
   clickFilter()
   {  
      this.StartPage=1;
      this.isFiltered=true;
      if(this.source=='user-recipes')
      this.userFilter();
    else
     this.filter();
   }
   openSnackBar() {
    if(!this.userService.token)
      this._snackBar.open(' אינך רשום - הרשם על מנת לצפות בפרטי מתכון','close');

  }  
}

