/**
 * Created by Vlad on 16/10/2016.
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';
import {Configuration} from '../app.constants';
import {Image} from "../model/image";

@Injectable()
export class ImagesService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private configuration: Configuration) {
        this.actionUrl = configuration.ServerWithApiUrl;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public getThumbnails = (agencyId : number): Observable<Image[]> => {
        return this._http.get(this.actionUrl + 'agency/' + agencyId + '/thumbnails')
            .map((response: Response) => <Image[]>response.json()).catch(this.handleError);
    }

    public upload = (id: number, formData: FormData): Observable<Image> => {
        return this._http.post(this.configuration.SecureServerWithApiUrl + 'uploadImage/' + id, formData)
            .map((response: Response) => <Image>response.json()).catch(this.handleError);
    }

    public setSpread = (id: number): Observable<void> => {
        return this._http.put(this.configuration.SecureServerWithApiUrl + 'image/spread/' + id, {}).catch(this.handleError);
    }

    public setList = (id: number): Observable<void> => {
        return this._http.put(this.configuration.SecureServerWithApiUrl + 'image/list/' + id, {}).catch(this.handleError);
    }

    public delete = (id: number): Observable<void> => {
        return this._http.delete(this.configuration.SecureServerWithApiUrl + 'deleteImage/' + id).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
