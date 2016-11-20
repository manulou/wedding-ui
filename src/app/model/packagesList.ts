/**
 * Created by Vlad on 16/10/2016.
 */
import {Package} from "./package";

export class PackagesList {
    public currentPage : number;
    public lastPage : number;
    public pageSize : number;
    public totalResults : number;

    public sortField : string;
    public sortDirection : string;
    public list : Package[];
}