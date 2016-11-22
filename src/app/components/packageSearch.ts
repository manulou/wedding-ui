import {Component, OnInit} from '@angular/core';
import {Configuration} from "../app.constants";
import {PageInfo} from "../model/helper/pageInfo";
import {PackagesList} from "../model/packagesList";
import {SearchFilter} from "../model/helper/searchFilter";
import {PackagesService} from "../services/packagesService";
import {CountriesService} from "../services/countriesService";
import {Country} from "../model/country";
import {SearchState} from "../model/helper/searchState";

@Component({
    selector: 'packageSearch',
    providers: [PackagesService, CountriesService, Configuration],
    templateUrl: '../html/packageSearch.html'
})
export class PackageSearchComponent implements OnInit {

    public static searchState : SearchState;

    public packages: PackagesList;
    public pageInfo : PageInfo;
    public searchFilter : SearchFilter;
    public countries : Country[];

    constructor(private packagesService: PackagesService,
                private countriesService: CountriesService) {}

    ngOnInit() {
        this.packages = new PackagesList();
        this.packages.list = [];

        if (!PackageSearchComponent.searchState) {
            PackageSearchComponent.searchState = new SearchState();

        }

        this.searchFilter = PackageSearchComponent.searchState.searchFilter;
        this.pageInfo = PackageSearchComponent.searchState.pageInfo;

        this.countriesService.getAllForFilter()
            .subscribe(countries => this.countries = countries);

        this.search();
    }

    public search(): void {
        PackageSearchComponent.searchState.searchFilter = this.searchFilter;
        PackageSearchComponent.searchState.pageInfo = this.pageInfo;
        this.packagesService
            .findPackages(PackageSearchComponent.searchState.pageInfo , PackageSearchComponent.searchState.searchFilter)
            .subscribe((data:PackagesList) => this.packages = data,
                error => console.log(error),
                () => console.log('Get all agencies complete'));
    }

    public reset(): void {
        PackageSearchComponent.searchState.searchFilter = new SearchFilter();
        this.searchFilter = PackageSearchComponent.searchState.searchFilter;
    }

    private changePage(pageNumber : number): void {
        if (pageNumber >= 0 && pageNumber < this.packages.lastPage) {
            this.pageInfo.page = pageNumber;
            this.search();
        }
    }
}