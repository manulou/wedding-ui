/**
 * Created by Vlad on 04/11/2016.
 */
export class SearchFilter {
    public keyword : string;
    public location : number;
    public countryId : number;
    public maxPrice : number;

    constructor() {
        this.countryId = 0;
        this.location = 0;
    }
}
