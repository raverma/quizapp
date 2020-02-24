import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { UserService } from './../../services/user.service';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService : AlertService
    ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  onSubmit()
  {

    if (this.registerForm.invalid) {
      return;
  }

  this.loading = true;
    this.userService.register(this.registerForm.value)
    .pipe(first())
    .subscribe(
     data => {
       this.alertService.success('Registration successful', true);
       this.router.navigate(['/login']);
     }
    );
    this.registerForm.reset();
  }

}
