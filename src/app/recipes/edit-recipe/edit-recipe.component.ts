import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  id:number;
  editMode:boolean;
  recipeFrom:FormGroup;

  constructor(private route:ActivatedRoute , private recipesService:RecipesService , private fb:FormBuilder , private router:Router) { }

  ngOnInit(): void {

      this.route.params.subscribe(
        (params)=>{
          this.id = params['id']
          this.editMode = params['id'] != null;
          this.formInit();
        }
      ) 

  }

  formInit(){
    let recipeName = "";
    let ImagePath ="";
    let description="";
    let ingredientArray = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipesService.getRecipesById(this.id)
      recipeName = recipe.name;
      ImagePath = recipe.imagePath;
      description = recipe.description;
      if(recipe.ingredients){
        for(let ingredient of recipe.ingredients){
          ingredientArray.push(
            new FormGroup({
              'name': new FormControl(ingredient.name , [Validators.required]),
              'amount':new FormControl(ingredient.amount ,[Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeFrom = this.fb.group({
      'name': [recipeName , [Validators.required]],
      'imgPath':[ImagePath ,[Validators.required]],
      'description':[description ,[Validators.required]],
      'ingredients':ingredientArray
    })
  }


  get formArray(){
    return this.recipeFrom.get('ingredients') as FormArray;
  }

  get name(){
    return this.recipeFrom.get('name');
  }

  get imgPath(){
    return this.recipeFrom.get('imgPath');
  }

  get description(){
    return this.recipeFrom.get('description');
  }

  

  onSubmit(){
    const submitRecipe2 = new Recipe(this.name.value,this.description.value,this.imgPath.value,this.recipeFrom.get('ingredients').value)
   // console.log(submitRecipe2);
    if(this.editMode){
      this.recipesService.updateRecipe(this.id,submitRecipe2)
    }else{
      this.recipesService.addNewRecipe(submitRecipe2)   
    }
    this.router.navigate(['/recipes']);
  }

  addItem(){
    (<FormArray>this.recipeFrom.get('ingredients')).push(
      new FormGroup({
        "name":new FormControl(null, Validators.required),
        "amount":new FormControl(null,[Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this.router.navigate(['/recipes']);
  }

  deleteIngredient(i:number){
    this.formArray.removeAt(i);
  }


}
