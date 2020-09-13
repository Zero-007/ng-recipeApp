import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { MessageRecipeComponent } from './message-recipe/message-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
   path:'', component:RecipesComponent , canActivate:[AuthGuard],
   children:
   [
    {path:'new', component:EditRecipeComponent},
    {path:':id' , component:RecipeDetailComponent},
    {path:'' , component:MessageRecipeComponent , pathMatch:'full'},
    {path:':id/edit' , component:EditRecipeComponent}
  ]
}
];


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    MessageRecipeComponent,
    EditRecipeComponent,
    
  ],
  exports:[
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    MessageRecipeComponent,
    EditRecipeComponent,
    
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  
})
export class RecipesModule { }
