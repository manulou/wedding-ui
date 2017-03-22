/**
 * Created by Vlad on 17/10/2016.
 */
import { Routes } from '@angular/router';

import { FrontpageComponent } from './components/frontpage';
import { AgencyDetailsComponent } from './components/agencyDetails';
import { PackageSearchComponent } from './components/packageSearch';
import { SecureAgenciesComponent } from "./components/secureAgencies";
import { EditAgencyComponent } from "./components/editAgency";
import {LoginComponent} from "./components/login";
import {ContactComponent} from "./components/contact";

export const routes: Routes = [
    { path: '', component: FrontpageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'search', component: PackageSearchComponent },
    { path: 'agency/:seolink', component: AgencyDetailsComponent },
    { path: 'secure', component: SecureAgenciesComponent },
    { path: 'secure/agency/:id', component: EditAgencyComponent },
    { path: 'contact', component: ContactComponent },
];
