import {Component} from '@angular/core';
import {Configuration} from "../app.constants";
import {LoginService} from "../services/loginService";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {User} from "../model/user";

@Component({
    selector: 'navigation',
    providers: [LoginService, Configuration],
    templateUrl: '../html/navigation.html'
})
export class NavigationComponent {

    public authenticated: boolean;

    constructor(private router: Router,
                private loginService: LoginService) {
        LoginService.user.subscribe((user: User) => this.authenticated = user.id ? true : false);
    }

    logout() {
        this.loginService.logout().subscribe(() => {
                LoginService.setUser(new User());
                this.router.navigate(['/']);
            }, error => this.handleError(error)
        );
    }

    private handleError(error: Response) {
        console.log('Log out failed');
    }
}
