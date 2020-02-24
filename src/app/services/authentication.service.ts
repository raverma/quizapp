import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { User } from './../models/user';
import {BehaviorSubject} from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticateService{
user = new BehaviorSubject<User>(null);
Url: string;
header: any;
constructor(private http: HttpClient)
{
        this.Url ='http://localhost:55621/api/users/';
        //const headerSettings: {[name:string]:string | string[];} = {};
        //this.header = new HttpHeaders(headerSettings);
}

  login(user: User) {
    return this.http.post<any>(this.Url+'Login',user).pipe(
      tap(respData => {
            if(respData == "Success")
            {
              const Suser = new User(0,user.email,user.password,user.firstName,user.lastName);
              this.user.next(Suser);
            }
      })
    );
  }


}