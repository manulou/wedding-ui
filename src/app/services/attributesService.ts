/**
 * Created by Vlad on 16/10/2016.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import {Configuration} from '../app.constants';
import {Attribute} from "../model/attribute";

@Injectable()
export class AttributesService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private configuration: Configuration) {
        this.actionUrl = configuration.ServerWithApiUrl;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('X-Requested-With', 'XMLHttpRequest');
    }

    public getAll = (): Observable<Attribute[]> => {
        return this._http.get(`${this.actionUrl}getAttributes`)
            .map((response:Response) => <Attribute[]>response.json()).catch(this.handleError);
    }

    public getByCategoryName = (name: string): Observable<Attribute[]> => {
        return this._http.get(`${this.actionUrl}getAttributesByCategoryName?name=${name}`)
            .map((response:Response) => <Attribute[]>response.json()).catch(this.handleError);
    }

    public save = (attribute: Attribute): Observable<Attribute> => {
        return this._http.post(`${this.configuration.SecureServerWithApiUrl}saveAttribute`, attribute)
            .map((response: Response) => <Attribute>response.json()).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}
