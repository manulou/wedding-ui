import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import {FrontpageComponent} from "./components/frontpage";
import {AgencyDetailsComponent} from "./components/agencyDetails";
import {routes} from "./app.routes";
import {AppComponent} from "./app.component";
import {SecureAgenciesComponent} from "./components/secureAgencies";
import {NavigationComponent} from "./components/navigation";
import {EditAgencyComponent} from "./components/editAgency";
import {PackageSearchComponent} from "./components/packageSearch";
import {LoginComponent} from "./components/login";
import {ContactComponent} from "./components/contact";

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(routes) ],
    declarations: [ AppComponent, LoginComponent, FrontpageComponent, NavigationComponent, PackageSearchComponent, AgencyDetailsComponent, SecureAgenciesComponent, EditAgencyComponent, ContactComponent ],
    bootstrap:    [ AppComponent, NavigationComponent ]
})
export class AppModule { }
