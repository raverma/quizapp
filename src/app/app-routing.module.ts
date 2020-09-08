import { QuestionCreateComponent } from './quiz/question-bank/question-create/question-create.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent} from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'questions', component: QuestionCreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
