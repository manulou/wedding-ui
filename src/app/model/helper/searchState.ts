import {PageInfo} from "./pageInfo";
import {SearchFilter} from "./searchFilter";
/**
 * Created by Vlad on 04/11/2016.
 */
export class SearchState {
    public searchFilter : SearchFilter;
    public pageInfo : PageInfo;

    constructor() {
        this.searchFilter = new SearchFilter();

        this.pageInfo = new PageInfo();
        this.pageInfo.page = 0;
        this.pageInfo.sortField = 'price';
        this.pageInfo.sortDirection = 'asc';
    }
}
