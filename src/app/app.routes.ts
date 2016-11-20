/**
 * Created by Vlad on 17/10/2016.
 */
import { Routes } from '@angular/router';

import { AgencyDetailsComponent } from './components/agencyDetails';
import { PackageSearchComponent } from './components/packageSearch';
import { SecureAgenciesComponent } from "./components/secureAgencies";
import { EditAgencyComponent } from "./components/editAgency";

export const routes: Routes = [
    { path: '', component: PackageSearchComponent },
    { path: 'agency/:seolink', component: AgencyDetailsComponent },
    { path: 'secure', component: SecureAgenciesComponent },
    { path: 'secure/agency/:id', component: EditAgencyComponent },
];