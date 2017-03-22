import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {Configuration} from "../app.constants";
import {SearchFilter} from "../model/helper/searchFilter";
import {PackagesService} from "../services/packagesService";
import {CountriesService} from "../services/countriesService";
import {Country} from "../model/country";
import {SearchState} from "../model/helper/searchState";
import selectRedraw from "./selectRedraw";
import {PackageSearchComponent} from "./packageSearch";
import {Router} from "@angular/router";
import {Package} from "../model/package";
import {AttributesService} from "../services/attributesService";
import {Attribute} from "../model/attribute";
declare var $:any;

@Component({
    selector: 'index',
    providers: [PackagesService, CountriesService, AttributesService, Configuration],
    templateUrl: '../html/frontpage.html'
})
export class FrontpageComponent implements OnInit {

    public searchFilter : SearchFilter;
    public countries : Country[];
    public packages : Package[];
    public locations : Attribute[];

    constructor(private packagesService: PackagesService,
                private countriesService: CountriesService,
                private attributesService: AttributesService,
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
        this.attributesService.getByCategoryName('Location')
            .subscribe(locations => {
                this.locations = locations;
                this.changeDetector.detectChanges();
                selectRedraw();
            });
        this.getMostRecent();
    }

    public getMostRecent(): void {
        this.packagesService
            .mostRecentPackages()
            .subscribe((data:Package[]) => this.packages = data,
                error => console.log(error),
                () => console.log('Get all agencies complete'));
    }

    private search(): boolean {
        this.searchFilter.countryId = parseInt($('#country').val() === '' ? 0 : $('#country').val());
        this.searchFilter.location = parseInt($('#location').val() === '' ? 0 : $('#location').val());
        PackageSearchComponent.searchState = new SearchState();
        PackageSearchComponent.searchState.searchFilter = this.searchFilter;
        this.router.navigate(['/search']);
        return false;
    }

    public getListImage(pkg): string {
        return `url('/api/agency/${pkg.weddingAgency.id}/list')`;
    }
}
