import { DropdownDirective } from './shared/dropdown.directive';
import { AuthenticateService } from './services/authentication.service';

import {  HttpClientModule} from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { appRoutes } from './routes';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';

import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertComponent } from './shared/alert/alert.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';




@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    AlertComponent,
    DashboardComponent,
    HeaderComponent,
    DropdownDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    DropdownDirective
  ],
  
  providers: [AuthenticateService,UserService,AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
