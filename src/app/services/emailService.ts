/**
 * Created by Vlad on 16/10/2016.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import {AgenciesList} from '../model/agenciesList';
import {Configuration} from '../app.constants';
import {PageInfo} from "../model/helper/pageInfo";
import {Agency} from "../model/agency";
import {Email} from "../model/email";

@Injectable()
export class EmailService {

    private headers: Headers;

    constructor(private _http: Http, private configuration: Configuration) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('X-Requested-With', 'XMLHttpRequest');
    }

    public send = (email: Email): Observable<void> => {
        return this._http.put(this.configuration.ServerWithApiUrl + 'enquire', email).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
