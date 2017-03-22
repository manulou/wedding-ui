import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Configuration} from "../app.constants";
import {LoginService} from "../services/loginService";
import {User} from "../model/user";
import {Response} from "@angular/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  providers: [LoginService, Configuration],
  templateUrl: '../html/login.html'
})
export class LoginComponent {

  @ViewChild('loginForm') public loginForm: NgForm;

  user: User;

  constructor(private router: Router,
              private loginService: LoginService) {
    this.user = new User();
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.user).subscribe(user => {
        this.user = user;
        LoginService.setUser(user);
        this.router.navigate(['/secure']);

      }, error => this.handleError(error)
      );
    }
  }

  private handleError(error: Response) {
    console.log('Login failed');
    alert('Invalid login or password');
  }

}
