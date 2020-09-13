import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';




const routes: Routes = [
  
  {path:'' , redirectTo:'/recipes' , pathMatch:'full'},
  {path:'auth' , component:AuthComponent},
  {path:'recipes' , loadChildren:'./recipes/recipes.module#RecipesModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }