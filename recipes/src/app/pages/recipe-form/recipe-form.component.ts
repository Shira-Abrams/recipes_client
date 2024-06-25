
import { Component, NgModule, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgFor,NgIf } from '@angular/common';
import { from, min, of } from 'rxjs';
import {MatSelectModule,MatOption} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Inject } from '@angular/core';
import { CategorieServiceService } from '../../shared/services/categories/categorie-service.service';
import { OnInit } from '@angular/core';
import { Categories } from '../../shared/models/categories';
import {MatInputModule} from '@angular/material/input';
import {ThemePalette} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgForm, NgModel } from '@angular/forms';
import { RecipeServiceService } from '../../shared/services/recipes/recipe-service.service';
import { UserServiceService } from '../../shared/services/user/user-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Recipes } from '../../shared/models/recipes';
import { OnChanges } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgFor,NgIf,MatSelectModule,MatFormFieldModule,MatOption,MatInputModule,MatCheckboxModule],
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.scss'
})
export class RecipeFormComponent implements OnInit {
   addRecipeForm:FormGroup=new FormGroup('')
   imgSrc:string|ArrayBuffer|null=null
   lastCategoryFill=false
   categoriesList:Categories[]=[];
   cat =new FormControl('')
   isprivate: boolean=false;
   imagefile?:File
   formData=new FormData()
   editedRecipe?:any;
   stringRecipe?:any
   constructor(private categorieService:CategorieServiceService,private recipeServices:RecipeServiceService,
    private userServices:UserServiceService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private snackBar:MatSnackBar) {
       console.log('recipe for eidt  before parse to json= ' ,this.editedRecipe);
       this.editedRecipe=this.activatedRoute.snapshot.params['recipe2edit'];
       this.stringRecipe=this.activatedRoute.snapshot.params['recipe2edit'];
       if(this.editedRecipe){
          this.editedRecipe=JSON.parse(this.editedRecipe) ;
       }
       else{
        this.editedRecipe={
    name:'',  
    description:'',
    categories:[],
    difficulty:'',
    preperationTime:'',
    layersArray:[{description:'',ingredients:[]}],
    preperationInstruction:[],
    image:'',
    isPrivate:''
   };
       }
        
         //  console.log(this.activatedRoute.snapshot.params['id']);

       console.log('recipe for eidt  after parse to json= ' ,this.editedRecipe.name);
       
   }
  
  // addRecipeForm:FormGroup=new FormGroup({
  //     name:new FormControl('',Validators.required),
  //     description:new FormControl('',Validators.required),
  //     categories :new  FormControl('',Validators.required),
  //     otherCategory:new  FormControl('',Validators.required),
  //     difficulty:new FormControl('',[Validators.required,Validators.min(1),Validators.max(5)] ),
  //     preperationTime:new FormControl('',Validators.required),
  //     layersArray:new FormArray([
  //         new FormGroup({
  //            description:new FormControl(''),
  //            ingredients:new FormArray([
  //              new FormControl('',Validators.required)
  //            ])
  //         })
  //     ]),
  //     preperationInstruction:new FormArray([new FormControl('',Validators.required)]),
  //     image:new FormControl(),
  //     isPrivate:new FormControl('')
  // })
  get categories(): FormControl {
        return this.addRecipeForm?.get('categories') as FormControl;
  }

  get layersArray(): FormArray {
    return this.addRecipeForm?.get('layersArray') as FormArray;
  }
  get preperationInstruction():FormArray{
    return this.addRecipeForm?.get('preperationInstruction') as FormArray
  }
  
  
  ingredients(index:number):FormArray
 {
    const layer=this.layersArray.at(index) as FormGroup;
    return layer.get('ingredients') as FormArray 
 }


  addIngridiet(layerIndex:number,ingridientIndex:number) {

    
     if(ingridientIndex==this.ingredients(layerIndex).length-1&&this.ingredients(layerIndex).at(ingridientIndex).value)
        this.ingredients(layerIndex).push(new FormControl ('',Validators.required))

  }
  removeIngridiet(layerIndex:number,ingridientIndex:number) {
    if(this.ingredients(layerIndex).length!=1&&this.ingredients(layerIndex).at(ingridientIndex).value=='')
       this.ingredients(layerIndex).removeAt(ingridientIndex);
  }


 addLyers() {  
    console.log('at addLyers');
    this.layersArray.push( new FormGroup({
     description:new FormControl(''),
     ingredients:new FormArray([
       new FormControl('',Validators.required)
     ])
  }) )

  console.log('after pushing new layers ');
  
 } 
 removeLyers() {
  this.layersArray.removeAt(this.layersArray.length-1)
}
 

 onFileSelected($event: any) {
  const input = $event.target as HTMLInputElement; 
  console.log('imageFile =',$event.target.files[0]);
  console.log('typeof image =',typeof $event.target.files[0]);
  this.imagefile=$event.target.files[0]
  this.formData.append('image',$event.target.files[0]);
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


  RemoveInstruction(i: number) {
    if (this.preperationInstruction.length!=1&& this.preperationInstruction.at(i).value=='')
       this.preperationInstruction.removeAt(i);
  }
  
    addInstruction(i:number) {
       if(i==this.preperationInstruction.length-1&&this.preperationInstruction.at(i).value)
         this.preperationInstruction.push(new FormControl(''))
    }
    
  ngOnInit() {
    console.log('at edit recipe oninit the recipe for editis : ' , this.editedRecipe);
    
   this.categorieService.getAllCategories().subscribe(data=>{
       this.categoriesList=data;
       console.log('all categories in recipe form ',this.categoriesList);
       
   })
    
       
    this.addRecipeForm=new FormGroup({
      name:new FormControl(this.editedRecipe?.name,Validators.required),
      description:new FormControl(this.editedRecipe?.description,Validators.required),
      categories :new  FormControl(this.editedRecipe.categories,Validators.required),
      otherCategory:new  FormControl(''),
      difficulty:new FormControl(this.editedRecipe?.difficulty,[Validators.required,Validators.min(1),Validators.max(5)] ),
      preperationTime:new FormControl(this.editedRecipe?.preperationTime,Validators.required),
      layersArray:new FormArray([
          new FormGroup({
             description:new FormControl(this.editedRecipe.layersArray[0].description,),
             ingredients:new FormArray([
               new FormControl(this.editedRecipe.layersArray[0].ingredients[0],Validators.required,)
             ])
          })
      ]),
      preperationInstruction:new FormArray([new FormControl(this.editedRecipe.preperationInstruction[0],Validators.required)]),
      image:new FormControl(),
      isPrivate:new FormControl(this.editedRecipe.isprivate)
  }) 

 
 
   for (let i = 1; i < this.editedRecipe.layersArray[0].ingredients.length; i++) {
        this.ingredients(0).push(new FormControl(this.editedRecipe.layersArray[0].ingredients[i],Validators.required))
   }
   if(this.stringRecipe)
   this.ingredients(0).push(new FormControl('',Validators.required))

   for(let i=1;i<this.editedRecipe.layersArray.length;i++)
    {
      this.layersArray.push( 
        new FormGroup({
          description:new FormControl(this.editedRecipe.layersArray[i].description,),
          ingredients:new FormArray([
            new FormControl(this.editedRecipe.layersArray[i].ingredients[0],Validators.required,)
          ])
       })
      );
      for (let j = 1; j < this.editedRecipe.layersArray[i].ingredients.length; j++) {
        this.ingredients(i).push(new FormControl(this.editedRecipe.layersArray[i].ingredients[j]))
        
      }
      if(this.stringRecipe)
        this.ingredients(i).push(new FormControl(''))
    } 
    for (let i = 1; i < this.editedRecipe.preperationInstruction.length; i++) {
      this.preperationInstruction.push(new FormControl(this.editedRecipe.preperationInstruction[i]))
      
    }
    if(this.stringRecipe)
    this.preperationInstruction.push(new FormControl(''))
    if(this.stringRecipe)
    this.imgSrc= `http://localhost:5000/images/${this.editedRecipe.imagUrl} `;
    
    console.log(this.addRecipeForm.value);
    this.addRecipeForm.valueChanges.subscribe(()=>{
      console.log('change at form');
      
      this.isFromvalid();
    })

  }
  

  sumbitREcipe() {
    console.log('at sumbitREcipe');
    console.log(this.addRecipeForm?.value);
    let allCategoreis;
    Object.keys(this.addRecipeForm.controls).forEach(key=>{
    let  control=this.addRecipeForm?.get(key)
      if(control instanceof  FormControl&&key!='otherCategory'&&key!='categories'&&key!='image')
      this.formData.append(key,this.addRecipeForm?.get(key)?.value)
    })

    

    let anotherCategory=this.addRecipeForm?.get('otherCategory')?.value
    console.log('before adding anothe categor',this.addRecipeForm?.get('categories')?.value);
   if(this.addRecipeForm?.get('categories')?.value)
    {  
      allCategoreis=this.addRecipeForm?.get('categories')?.value;
      if(anotherCategory!='')
        this.addRecipeForm.get('categories')?.value.push(this.addRecipeForm.get('otherCategory')?.value)
    }
    else{
        allCategoreis=[anotherCategory];
    }
    
    console.log('after adding anothe category',this.addRecipeForm?.get('categories')?.value);
    
    for (let index = 0; index < allCategoreis.length; index++) {
        this.formData.append(`categories[${index}]`,allCategoreis[index])
      
    }
   let preaperInstruction=this.preperationInstruction.value;
   console.log('preaperInstruction ===',preaperInstruction );
   
   for (let index = 0; index < preaperInstruction.length-1; index++) {
    
       this.formData.append(`preperationInstruction[${index}]`,preaperInstruction[index])
   }

   let  layerArray=this.layersArray.value
    console.log('layerArray=',layerArray);
    for (let i = 0; i < layerArray.length; i++) { 
      // let  currenLayer=this.layersArray.at(i)
       let  currenLayer=layerArray[i];
       console.log('this currenLayer',currenLayer);
       let ingridients=currenLayer.ingredients
       console.log('curren ingridient ===', ingridients);
       this.formData.append(`layersArray[${i}][description]`,currenLayer.description)
        for (let j = 0; j < ingridients.length-1; j++) {

            this.formData.append(`layersArray[${i}][ingredients][${j}]`,ingridients[j])
          
        }
       
    }
    console.log('user =',this.userServices.currentUser);
  
    this.formData.append(`user[name]`,this.userServices.currentUser.username)
    this.formData.append('user[_id]',this.userServices.currentUser.id)

    console.log(this.formData);
    if(!this.stringRecipe)
      {
        this.recipeServices.addRecipes(this.formData)   
        this.router.navigateByUrl(`userRecipes/${this.userServices.currentUser.id}`)

      }
      else{
        console.log('recipeId=' ,this.editedRecipe._id,);
        this.recipeServices.updateRecipes(this.editedRecipe._id,this.formData) .subscribe(data=>{
        this.router.navigateByUrl(`userRecipes/${this.userServices.currentUser.id}`)

        },err=>{
          console.log(err);
          
        })

      }
      this.snackBar.open('המתכון נוסף בהצלחה ','close')
   }
   
   
  isFromvalid()
  { 

    let flag=false
     let form= this.addRecipeForm.value;
     console.log(form);
     
     Object.keys(this.addRecipeForm.controls).forEach(key=>{
      let  control=this.addRecipeForm?.get(key)
        if(control instanceof  FormControl&&key!='otherCategory'&&key!='categories'&&key!='image'&&key!='isPrivate')
          if(!control.value)
            {  
              console.log('control.value= ',control.value);
              flag=true;
            }
      })
    if(this.addRecipeForm.get('difficulty')?.errors&&this.addRecipeForm.get('difficulty')?.dirty)
      flag=true
    if(this.addRecipeForm.get('preperationTime')?.value<0)
      flag=true
    if(form.categories.length==0&&!form.otherCategory)
      flag=true

    for (let i = 0; i < form.layersArray.length; i++) {
        if(!form.layersArray[i].description)    
          flag=true;  
      console.log('form.layersArray[i].ingredients',form.layersArray[i].ingredients);
      if(form.layersArray[i].ingredients.length==1)
        flag=true
        
    }
    if(form.preperationInstruction.length==1)
      flag=true
     return flag;
  }
   
   
}