import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'signup', component: SignUpComponent
    
},
{
    path: 'login', component: SignInComponent
    
},
{
  path: 'dashboard', component: DashboardComponent
  
},
{
  path: 'home', component: HomeComponent
  
}

  ];

