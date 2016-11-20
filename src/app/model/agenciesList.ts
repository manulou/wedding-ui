/**
 * Created by Vlad on 16/10/2016.
 */
import {Agency} from "./agency";

export class AgenciesList {
    public currentPage : number;
    public lastPage : number;
    public pageSize : number;
    public totalResults : number;

    public sortField : string;
    public sortDirection : string;
    public list : Agency[];
}