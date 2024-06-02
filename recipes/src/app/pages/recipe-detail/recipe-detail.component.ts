import { Component ,OnInit} from '@angular/core';
import { RecipeServiceService } from '../../shared/services/recipes/recipe-service.service';
import { Recipes } from '../../shared/models/recipes';
import { ActivatedRoute } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { NgFor } from '@angular/common';
import { NgStyle } from '@angular/common';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [MatDividerModule,MatListModule,NgFor,NgStyle,NgIf],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit{
   currentRecipe?:Recipes;
   id?:string
   imgeUrl:string=''
   rnakArray:number[]=[]
   
  constructor(private recipeServicer:RecipeServiceService,private activatedRoute:ActivatedRoute) {

    
  }
  ngOnInit() {
    
     console.log('in recipe detail');
     this.activatedRoute.paramMap.subscribe(url=>{
      this.id=String(url.get('id'))
      console.log('recipe id ==',this.id); 
   })
  //  console.log(this.activatedRoute.snapshot.params['id']);
    
    this.recipeServicer.getRecipeById(this.id).subscribe(recipe=>{
      this.currentRecipe=recipe
      console.log(this.currentRecipe);
      this.imgeUrl=this.currentRecipe.imagUrl ||'https://cdn.pixabay.com/photo/2022/09/07/17/00/cook-7439182_640.jpg'
       console.log('imageURl',this.imgeUrl);
    })
    
     this.rnakArray=Array(this.currentRecipe?.difficulty).fill(0)
   
      
  }

}
