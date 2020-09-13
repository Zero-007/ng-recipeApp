import { Component, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy {
  
  subscription:Subscription;
  indexOfEditItem:number;
  editMode=false;
  editItem:Ingredient;
  @ViewChild('form',{static:false}) shoppingForm:NgForm;
 
  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit() {
     this.subscription = this.shoppingService.editItem.subscribe(
           index =>{
             this.indexOfEditItem=index;
             this.editMode = true;
             this.editItem = this.shoppingService.getIngedients(index);
             this.shoppingForm.setValue({
               'name':this.editItem.name,
               'amount':this.editItem.amount
             })

           })
  }

  AddIngredient(form:NgForm){
    const newItem ={
      name:form.value.name,
      amount:form.value.amount
    }
    if(this.editMode){
      this.shoppingService.updateIngredient(this.indexOfEditItem,newItem)
    }else{
      this.shoppingService.addItem(newItem)   
    }
    this.editMode = false;
    form.reset();
  }

  clearForm(){
    this.editMode =false;
    this.indexOfEditItem=null;
    this.editItem = null;
    this.shoppingForm.reset();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  deleteItem(){
    this.shoppingService.deleteIngredient(this.indexOfEditItem);
    this.clearForm()
  }

}
