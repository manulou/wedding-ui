/**
 * Created by Vlad on 16/10/2016.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import {Configuration} from '../app.constants';
import {PageInfo} from "../model/helper/pageInfo";
import {PackagesList} from "../model/packagesList";
import {SearchFilter} from "../model/helper/searchFilter";

@Injectable()
export class PackagesService {

    private configuration: Configuration;
    private headers: Headers;

    constructor(private _http: Http, configuration: Configuration) {
        this.configuration = configuration;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public delete = (id: number): Observable<void> => {
        return this._http.delete(this.configuration.SecureServerWithApiUrl + 'deletePackage/' + id).catch(this.handleError);
    }

    public findPackages = (pageInfo: PageInfo, searchFilter: SearchFilter): Observable<PackagesList> => {
        let params = new URLSearchParams();
        params.set('page', pageInfo.page.toString());
        params.set('sortField', pageInfo.sortField);
        params.set('sortDirection', pageInfo.sortDirection);
        if (searchFilter.countryId) {
            params.set('countryId', searchFilter.countryId.toString());
        }
        if (searchFilter.maxPrice) {
            params.set('maxPrice', searchFilter.maxPrice.toString());
        }
        return this._http.get(this.configuration.ServerWithApiUrl + 'searchPackages', { search : params })
            .map((response: Response) => <PackagesList>response.json()).catch(this.handleError);
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}