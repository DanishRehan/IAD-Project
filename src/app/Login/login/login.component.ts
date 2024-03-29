import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../User/User";
import { SigninService } from "../../Services/signin.service";
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SigninService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private signin: SigninService, private http: Http) { }

  user: User;
  response: string;

  sign(email: HTMLInputElement, password: HTMLInputElement): void {
    /*this.user = { username: email.value, password: userPassword.value };
     if (this.signin.checkUsername(this.user) == true) {
       SigninService.session.currentUser = email.value;
       this.router.navigate(["dashboard"]);
     }
     else {
       document.getElementById('response').className = "alert alert-danger";
       this.response = "Invalid Username or Password.";
     }*/
    let self = this;
    this.http.post("http://localhost:3000/staffs/login", { username: email.value, password: password.value },
      new Headers({ 'Content-type': 'application/json' })).toPromise().then(function (res) {
        //self.router.navigate(["dashboard"]);
        if (res.status === 200) {
          self.router.navigate(["dashboard"]);
        }
        else if (res.status === 203) {
          document.getElementById('response').className = "alert alert-danger";
          self.response = "Invalid Username or Password.";
        }
      })
  }

  signup(): void {
    this.router.navigate(["signup"]);
  }

  ngOnInit() {
    /*if (SigninService.session.currentUser != null) {
      this.router.navigate(["dashboard"]);
    }*/
  }

}
