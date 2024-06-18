import { Component ,OnInit} from '@angular/core';
import { RecipeServiceService } from '../../shared/services/recipes/recipe-service.service';
import { Recipes } from '../../shared/models/recipes';
import { ActivatedRoute } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { NgFor } from '@angular/common';
import { NgStyle } from '@angular/common';
import { NgIf } from '@angular/common';
import { UserServiceService } from '../../shared/services/user/user-service.service';
import { Router } from '@angular/router';
import { ForDirectiveDirective } from '../../shared/directives/for-directive.directive';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [MatDividerModule,MatListModule,NgFor,NgStyle,NgIf,ForDirectiveDirective,CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnInit{

  

   currentRecipe?:Recipes;
   id?:string
   imgeUrl:string=''
   userId?:string
   name='shira'
  constructor(private recipeServicer:RecipeServiceService,private activatedRoute:ActivatedRoute,private userService:UserServiceService ,private router:Router) {
   
  }
  ngOnInit() {
    
     console.log('in recipe detail');
     
     // console.log(this.activatedRoute.snapshot.params['id']);  another way to extract the param from  the url
     this.activatedRoute.paramMap.subscribe(url=>{
      this.id=String(url.get('id'))
      console.log('recipe id ==',this.id); 
   })
   this.recipeServicer.getRecipeById(this.id).subscribe(recipe=>{
      this.currentRecipe=recipe
      console.log('currentRecipe ==',this.currentRecipe);
      if(!this.currentRecipe.imagUrl)
        this.imgeUrl= 'https://cdn.pixabay.com/photo/2016/12/10/21/26/food-1898194_640.jpg'
      else{
         this.imgeUrl=`http://localhost:5000/images/${this.currentRecipe?.imagUrl}`
      }
       console.log('imageURl',this.imgeUrl);
    })

    this.userId=this.userService.currentUser.id;

    
  
     
     console.log('useId=',this.userService.currentUser);
     
      
  }
  editRecipe() {
   console.log('the current recipe send to edit is ', this.currentRecipe);
    let jrecipe=JSON.stringify(this.currentRecipe)
       this.router.navigateByUrl(`editReicpe/${jrecipe}`)

   }
  deleteRecipe() {
     this.recipeServicer.deleteRecipe(String(this.currentRecipe?._id))
     this.router.navigateByUrl('/allRecipe')
  }


  public generatePdf(elementId: string, pdfName: string): void {
   const element = document.getElementById(elementId);
   if (!element) {
     console.error('Element not found!');
     return;
   }

   html2canvas(element).then(canvas => {
     const imgData = canvas.toDataURL('image/png');
     const pdf = new jsPDF('p', 'mm', 'a4');
     const imgWidth = 210;
     const pageHeight = 295;
     const imgHeight = (canvas.height * imgWidth) / canvas.width;
     let heightLeft = imgHeight;
     let position = 0;

     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
     heightLeft -= pageHeight;

     while (heightLeft >= 0) {
       position = heightLeft - imgHeight;
       pdf.addPage();
       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
       heightLeft -= pageHeight;
     }

     pdf.save(pdfName);
   });
 }
 }
 

