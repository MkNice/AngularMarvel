import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routerChild: Routes = [
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent
  }
];
@NgModule({
  declarations: [
    RegistrationComponent,
    SignInComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routerChild),
  ],
  exports: [SignInComponent]
})
export class AuthorizationModule { }
