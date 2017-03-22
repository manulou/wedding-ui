import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import {Observer, Observable} from 'rxjs/Rx';
import {Configuration} from '../app.constants';
import {User} from "../model/user";

@Injectable()
export class LoginService {

    private static userObserver: Observer<User>;
    public static user: Observable<User> = Observable.create((observer: Observer<User>) => {
        LoginService.userObserver = observer;
    });

    public static setUser = (user: User): void => {
        LoginService.userObserver.next(user);
    }

    constructor(private _http: Http, private configuration: Configuration) {
    }

    public login = (user: User): Observable<User> => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('X-Requested-With', 'XMLHttpRequest');
      headers.append("Authorization", "Basic " + btoa(user.username + ":" + user.password));

      const options = new RequestOptions({ headers: headers });
      return this._http.get(this.configuration.SecureServerWithApiUrl + 'user', options)
        .map((response: Response) => <User>response.json()).catch(this.handleError);
    }

    public logout = (): Observable<void> => {
        return this._http.post(this.configuration.SecureServerWithApiUrl + 'user/logout', {}).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
