import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPsswordComponent } from './forgot-pssword/forgot-pssword.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'forgot-password/:token',
    component: ForgotPsswordComponent
  },
  { path: 'home', loadChildren: () => import(`./lazy-load/lazy-load.module`).then(m => m.LazyLoadModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
