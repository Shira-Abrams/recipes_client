import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { RecipeServiceService } from '../../shared/services/recipes/recipe-service.service';
import { Recipes } from '../../shared/models/recipes';
import { Router } from '@angular/router';
import { RepresentRecipesComponent } from '../represent-recipes/represent-recipes.component';
import { ActivatedRoute, } from '@angular/router';
@Component({
  selector: 'app-user-recipes',
  standalone: true,
  imports: [RepresentRecipesComponent],
  templateUrl: './user-recipes.component.html',
  styleUrl: './user-recipes.component.scss'
})
export class UserRecipesComponent implements OnInit {
   
  userId:string=''
  userRecipes:Recipes[]=[];
  constructor(private recipeServices:RecipeServiceService,private activatedRoute:ActivatedRoute) {
  
  }
  ngOnInit() {
    this.userId= this.activatedRoute.snapshot.params['userId']
    if(this.userRecipes.length==0){
      this.recipeServices.getRecipesByUSer(this.userId)
      .subscribe(data=>{
        this.userRecipes=data;
        this.recipeServices.userRecipes=data;
        console.log('user Recipe =',this.userRecipes);
        
      }) 
    }
    else{
          this.userRecipes=this.recipeServices.userRecipes;

    }

    
    console.log('user Recipe =',this.userRecipes);

  }
}

