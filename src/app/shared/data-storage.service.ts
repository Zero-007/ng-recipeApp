import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';

import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient , private recipesService:RecipesService) { }

  saveData(){
    let data = this.recipesService.getRecipes();
    this.http.put('https://ng-complete-guide-d40a7.firebaseio.com/recipes.json',data).subscribe(res=>{
      console.log(res);
    })
  }

  fetchData(){
   return this.http.get<Recipe[]>('https://ng-complete-guide-d40a7.firebaseio.com/recipes.json').
     pipe( 
       map(recipes=>{
          return recipes.map((recipe)=>{
             return {...recipe , "ingredients":recipe.ingredients?recipe.ingredients:[]}
          })
      }) ,
      tap(res=>{
        this.recipesService.setAllRecipes(res);
        //console.log(res);
      }) 
      )
    
  }



}
