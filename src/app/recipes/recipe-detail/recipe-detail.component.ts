import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipe;
  recipeId:number;
  

  constructor(private shoppingSer:ShoppingListService ,private recipesService:RecipesService, private route:ActivatedRoute, private router:Router , private dataService:DataStorageService) { }

  ngOnInit() {
    
    const data = this.recipesService.getRecipes();
    if(data.length === 0){
      this.dataService.fetchData().subscribe((data)=>{
       //  console.log(data);
        this.route.params.subscribe(
          params=>{
            this.recipeId = +params['id']
            this.recipe = this.recipesService.getRecipesById(this.recipeId)
          }
        )
         
      });
    }else{
      this.route.params.subscribe(
        params=>{
          this.recipeId = +params['id']
          this.recipe = this.recipesService.getRecipesById(this.recipeId)
        }
      )
    }
    
  }

  addToShoppingList(item){
      this.shoppingSer.recipeItemAdded(item);
  }

  ToEditRecipe(){
    //console.log(`recipes/${this.recipeId}/edit`)
    this.router.navigate([`recipes/${this.recipeId}/edit`]);
  }

  toDeleteRecipe(){
    this.recipesService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes'])
  }

 

}
