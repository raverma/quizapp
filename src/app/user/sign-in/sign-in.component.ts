import { AuthenticateService } from './../../services/authentication.service';
import { Validators } from '@angular/forms';
import { AlertService } from './../../services/alert.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loading = false;
  loginForm : FormGroup;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private alertService:AlertService,
    private authenticateService: AuthenticateService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password:['',Validators.required]
    });
  }
  
onSubmit()
{
  if (this.loginForm.invalid) {
    return;
  }

  this.loading = true;
    this.authenticateService.login(this.loginForm.value)
    .subscribe(
     data => {

       console.log(data);
       if(data == "Success")
       {
       this.router.navigate(['/dashboard']);
       }
       else
       {
        this.loading = false;
        this.alertService.error('Login Failed', true);
        this.router.navigate(['/login']);
       }
     }
    );
    this.loginForm.reset();
}
}

