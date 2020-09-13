import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {


  editItem = new Subject<number>();

 private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }
  
 getIngredients(){
   return this.ingredients;
 }

 getIngedients(i:number){
   return this.ingredients[i];
 }

 addItem(item:Ingredient){
  this.ingredients.push(item)
}

recipeItemAdded(item:Ingredient[]){
  this.ingredients = [];
  this.ingredients.push(...item)
}

updateIngredient(index:number,item:Ingredient){
  this.ingredients[index] = item;
}

deleteIngredient(index:number){
  this.ingredients.splice(index,1);
}

}
