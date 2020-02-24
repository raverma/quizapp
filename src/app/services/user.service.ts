import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";
import { User } from "../models/user";

@Injectable()
export class UserService{

    constructor(private http: HttpClient){}

    register(user: User) {
        return this.http.post("http://localhost:55621/api/users/Register",user);
    }

}