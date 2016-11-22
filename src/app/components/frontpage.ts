import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Configuration} from "../app.constants";
import {PageInfo} from "../model/helper/pageInfo";
import {PackagesList} from "../model/packagesList";
import {SearchFilter} from "../model/helper/searchFilter";
import {PackagesService} from "../services/packagesService";
import {CountriesService} from "../services/countriesService";
import {Country} from "../model/country";
import {SearchState} from "../model/helper/searchState";
import selectRedraw from "./selectRedraw";
import {PackageSearchComponent} from "./packageSearch";
import {Router} from "@angular/router";
declare var $:any;

@Component({
    selector: 'index',
    providers: [PackagesService, CountriesService, Configuration],
    templateUrl: '../html/frontpage.html'
})
export class FrontpageComponent implements OnInit {

    public searchFilter : SearchFilter;
    public countries : Country[];

    constructor(private packagesService: PackagesService,
                private countriesService: CountriesService,
                private changeDetector: ChangeDetectorRef,
                private router: Router) {}

    ngOnInit() {
        this.searchFilter = new SearchFilter();

        this.countriesService.getAllForFilter()
            .subscribe(countries => {
                this.countries = countries;
                this.changeDetector.detectChanges();
                selectRedraw();
            });

    }

    private search(): boolean {
        this.searchFilter.countryId = parseInt($('#country').val());
        PackageSearchComponent.searchState = new SearchState();
        PackageSearchComponent.searchState.searchFilter = this.searchFilter;
        this.router.navigate(['/search']);
        return false;
    }
}
