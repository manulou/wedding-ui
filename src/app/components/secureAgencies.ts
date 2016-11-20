import {Component, OnInit} from '@angular/core';
import {AgenciesService} from "../services/agenciesService";
import {AgenciesList} from "../model/agenciesList";
import {Configuration} from "../app.constants";
import {PageInfo} from "../model/helper/pageInfo";
import {Agency} from "../model/agency";
@Component({
    selector: 'agencies',
    providers: [AgenciesService, Configuration],
    templateUrl: '../html/secureAgencies.html'
})
export class SecureAgenciesComponent implements OnInit {
    public agencies: AgenciesList;
    public pageInfo : PageInfo;

    constructor(private agenciesService: AgenciesService) {}

    ngOnInit() {
        this.agencies = new AgenciesList();
        this.agencies.list = [];

        this.pageInfo = new PageInfo();
        this.pageInfo.page = 0;
        this.pageInfo.sortField = 'id';
        this.pageInfo.sortDirection = 'asc';
        this.getAllItems();
    }

    public getAllItems(): void {
        this.agenciesService
            .getAllSecure(this.pageInfo)
            .subscribe((data:AgenciesList) => this.agencies = data,
                error => console.log(error),
                () => console.log('Get all agencies complete'));
    }

    public deleteAgency(agency : Agency) : void {
        if (confirm('Are you sure you want to delete the agency ' + agency.name + '?')) {
            this.agenciesService.delete(agency.id).subscribe(() => this.searchAgencies(this.pageInfo.page));
        }
};

    private searchAgencies(pageNumber : number): void {
        if (pageNumber >= 0 && pageNumber < this.agencies.lastPage) {
            this.pageInfo.page = pageNumber;
            this.getAllItems();
        }
    }
}