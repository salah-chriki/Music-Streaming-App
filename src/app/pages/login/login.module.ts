import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {loginRoutes} from './login.route';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(loginRoutes)
  ]
})
export class LoginModule { }
