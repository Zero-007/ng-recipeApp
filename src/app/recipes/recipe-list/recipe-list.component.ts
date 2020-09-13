import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {
  recipes: Recipe[] ;
  recipesSubject:Subscription;
 
  constructor(private recipesService:RecipesService , private router:Router , private dataStorageService:DataStorageService) { }

  ngOnInit() {
    //console.log(this.recipes.length)
     
     this.recipes =  this.recipesService.getRecipes();
     this.recipesSubject = this.recipesService.changeRecipeSubject.subscribe(
       data =>{
         this.recipes = data;
       }
     )
  }

  // onSelect( id:number){
  //  // this.recipesService.selectedRecipe.emit(recipeEl);
  //   this.router.navigate(['/recipes/'+id])
  // }

  AddNewRecipe(){
      this.router.navigate(['recipes/new'])
  }

  ngOnDestroy(){
    this.recipesSubject.unsubscribe()
  }

}
