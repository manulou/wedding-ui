/**
 * Created by Vlad on 16/10/2016.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = "http://localhost:4200/api/";
    public SecureApiUrl: string = "secure/";
    public ServerWithApiUrl = this.Server;
    public SecureServerWithApiUrl = this.Server + this.SecureApiUrl;
}
