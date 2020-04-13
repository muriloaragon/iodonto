import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './shared/footer/footer.component';


const routes: Routes = [{
  path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent,},
  {path: 'footer', component: FooterComponent,}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
