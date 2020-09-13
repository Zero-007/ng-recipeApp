import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [ ];

  constructor(private shoppingService :ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
  }

  onEditItem(i:number){
    this.shoppingService.editItem.next(i);
    // console.log("Item index selected in shopping-list")
    // console.log(i)
  }

 

}
