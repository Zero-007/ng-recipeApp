import { Injectable, EventEmitter, Output } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  changeRecipeSubject = new Subject<Recipe[]>();
 
//  private recipes: Recipe[] = [ new Recipe('A Burger with fries', 'This is cheese Burger with some fires', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
//  [ new Ingredient("Buns",2),
//   new Ingredient("Fries",10),
//   new Ingredient("cheese",2)
// ]),
//   new Recipe('A Spinach Curry', 'This is spinach curry with some spinach and tasty masalas', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
//   [
//     new Ingredient("spinach",5),
//     new Ingredient("curry",1),
//   ])];

private recipes: Recipe[]=[];

 setAllRecipes(data:Recipe[]){
   this.recipes = data;
   this.changeRecipeSubject.next(this.recipes.slice());
 }

 getRecipes(){
   return this.recipes.slice();
 }

 getRecipesById(id:number){
   return this.recipes[id];
 }

 updateRecipe(id:number,recipe:Recipe){
   this.recipes[id] = recipe;
   this.changeRecipeSubject.next(this.recipes.slice())
 }

 addNewRecipe(recipe:Recipe){
   this.recipes.push(recipe);
   this.changeRecipeSubject.next(this.recipes.slice())
 }

 deleteRecipe(id:number){
   this.recipes.splice(id,1);
   this.changeRecipeSubject.next(this.recipes.slice())
 }

  constructor() { }
  


}
