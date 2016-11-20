import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule }  from '@angular/router';

import {AgencyDetailsComponent} from "./components/agencyDetails";
import {routes} from "./app.routes";
import {AppComponent} from "./app.component";
import {SecureAgenciesComponent} from "./components/secureAgencies";
import {NavigationComponent} from "./components/navigation";
import {EditAgencyComponent} from "./components/editAgency";
import {PackageSearchComponent} from "./components/packageSearch";

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(routes) ],
    declarations: [ AppComponent, NavigationComponent, PackageSearchComponent, AgencyDetailsComponent, SecureAgenciesComponent, EditAgencyComponent ],
    bootstrap:    [ AppComponent, NavigationComponent ]
})
export class AppModule { }
