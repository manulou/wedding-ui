/**
 * Created by Vlad on 16/10/2016.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import {AgenciesList} from '../model/agenciesList';
import {Configuration} from '../app.constants';
import {PageInfo} from "../model/helper/pageInfo";
import {Agency} from "../model/agency";

@Injectable()
export class AgenciesService {

    private headers: Headers;

    constructor(private _http: Http, private configuration: Configuration) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getAll = (pageInfo: PageInfo): Observable<AgenciesList> => {
        return this.findAgencies(pageInfo, this.configuration.ServerWithApiUrl);
    }

    public getAllSecure = (pageInfo: PageInfo): Observable<AgenciesList> => {
        return this.findAgencies(pageInfo, this.configuration.SecureServerWithApiUrl);
    }

    private findAgencies = (pageInfo: PageInfo, actionUrl : string): Observable<AgenciesList> => {
        let params = new URLSearchParams();
        params.set('page', pageInfo.page.toString());
        params.set('sortField', pageInfo.sortField);
        params.set('sortDirection', pageInfo.sortDirection);
        return this._http.get(actionUrl + 'searchAgencies', { search : params })
            .map((response: Response) => <AgenciesList>response.json()).catch(this.handleError);
    }

    public get = (id: number): Observable<Agency> => {
        return this._http.get(this.configuration.ServerWithApiUrl + 'getAgency/' + id)
            .map((response: Response) => <Agency>response.json()).catch(this.handleError);
    }

    public getBySeolink = (seolink: string): Observable<Agency> => {
        return this._http.get(this.configuration.ServerWithApiUrl + 'getAgencyBySeolink/' + seolink)
            .map((response: Response) => <Agency>response.json()).catch(this.handleError);
    }

    public save = (agency: Agency): Observable<Agency> => {
        return this._http.post(this.configuration.SecureServerWithApiUrl + 'saveAgency', agency)
            .map((response: Response) => <Agency>response.json()).catch(this.handleError);
    }

    public delete = (id: number): Observable<void> => {
        return this._http.delete(this.configuration.SecureServerWithApiUrl + 'deleteAgency/' + id).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}