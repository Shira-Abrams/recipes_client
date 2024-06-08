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
   imgSrc:string|ArrayBuffer|null=null




  
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
      isPrivate:new FormControl('פרטי ?')


      
    
  })
  get categories(): FormArray {
        return this.addRecipeForm.get('categories') as FormArray;
  }

  get layersArray(): FormArray {
    return this.addRecipeForm.get('layersArray') as FormArray;
  }
  
  
  
  ingredients(index:number):FormArray
 {
  const layer=this.layersArray.at(index) as FormGroup;
    return layer.get('ingredients') as FormArray 
 }
  addCategory() {
   
    this.categories.push(new FormControl('הכנס קטגוריה',Validators.required))
 }
  removeCategory()
  {  

     this.categories.removeAt(this.categories.length-1);
  }


  addIngridiet(index:number) {
    this.ingredients(index).push(new FormControl ('הכנס מוצר'))
  }
  removeIngridiet(index:number) {
    this.ingredients(index).removeAt(this.ingredients(index).length-1)
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
 removeLyers() {
  this.layersArray.removeAt(this.layersArray.length-1)
}
 

 onFileSelected($event: Event) {
  const input = $event.target as HTMLInputElement; 
   if(input.files && input.files[0])
    {
      const img=input.files[0];
     const fileReader=new FileReader();
      fileReader.onload=()=>{
        this.imgSrc=fileReader.result;
      };
      fileReader.readAsDataURL(img)
      
    }
  }
}