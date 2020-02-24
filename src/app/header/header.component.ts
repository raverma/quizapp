import { AuthenticateService } from './../services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
isAuthenticated = false;
private userSub: Subscription;
  constructor(private authService: AuthenticateService) { }

  ngOnInit() {
   this.userSub = this.authService.user.subscribe(user=>
    {
        this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy()
  {
    this.userSub.unsubscribe();
  }

}
