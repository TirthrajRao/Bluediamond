import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
				path: '',
				pathMatch: "full",
				redirectTo: 'reset-password'
			},
      {
      path: 'reset-password',
      component: ResetPasswordComponent
    }
  ]
  }
]

@NgModule({
  declarations: [
    ResetPasswordComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule
  ]
})
export class LazyLoadModule { }
