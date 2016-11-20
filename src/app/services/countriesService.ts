/**
 * Created by Vlad on 16/10/2016.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import {Configuration} from '../app.constants';
import {Country} from "../model/country";

@Injectable()
export class CountriesService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private configuration: Configuration) {
        this.actionUrl = configuration.ServerWithApiUrl;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getAll = (): Observable<Country[]> => {
        return this._http.get(this.actionUrl + 'getCountries')
            .map((response: Response) => <Country[]>response.json()).catch(this.handleError);
    }

    public getAllForFilter = (): Observable<Country[]> => {
        return this._http.get(this.actionUrl + 'getCountriesForFilter')
            .map((response: Response) => <Country[]>response.json()).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}