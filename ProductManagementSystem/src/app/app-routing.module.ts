import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoginComponent } from './login/login.component';
import { ProductDashComponent } from './product-dash/product-dash.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
  path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'signup', component:SignupComponent
  },
  {
    path:'product', component:ProductDashComponent
  },
  {
    path:'favourite',component:FavoriteComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
