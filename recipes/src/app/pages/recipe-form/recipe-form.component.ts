import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgFor,NgIf } from '@angular/common';
import { min } from 'rxjs';
@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgFor,NgIf],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent {



  
  addRecipeForm:FormGroup=new FormGroup({
      name:new FormControl('enter name',Validators.required),
      description:new FormControl('הכנס תאור',Validators.required),
      categories:new FormArray([
        new  FormControl('הכנס קטגוריה',Validators.required)
      ]),
      difficulty:new FormControl('הכנס דרגת קושי',[Validators.required,Validators.min(1),Validators.max(5)] ),
      layersArray:new FormArray([
          new FormGroup({
             description:new FormControl('הכנס תאור'),
             ingredients:new FormArray([
               new FormControl('הכנס מוצר',Validators.required)
             ])
          })
      ]),
      preperationInstruction:new FormControl('הוראות הכנה',Validators.required),
      imagUrl:new FormControl(),
      isPrivate:new FormControl()


      
    
  })
  get categories(): FormArray {
        return this.addRecipeForm.get('categories') as FormArray;
  }

  get layersArray(): FormArray {
    return this.addRecipeForm.get('layersArray') as FormArray;
  }
  
  public get ingredients() :FormArray {
    const layer=this.layersArray.at(0) as FormGroup;
    return layer.get('ingredients') as FormArray
  }
  

  addCategory() {
   
    this.categories.push(new FormControl('הכנס קטגוריה',Validators.required))
 }
  removeCategory()
  {  

     this.categories.removeAt(this.categories.length-1);
  }


  addIngridiet() {
    this.ingredients.push(new FormControl ('הכנס מוצר'))
  }

    addLyers() {  
       console.log('at addLyers');
       
       this.layersArray.push( new FormGroup({
        description:new FormControl('הכנס תאור'),
        ingredients:new FormArray([
          new FormControl('הכנס מוצר',Validators.required)
        ])
     }) )

     console.log('after pushing new layers ');
     

  } 
}