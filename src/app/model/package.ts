import {PackageAttribute} from "./packageAttribute";
import {Agency} from "./agency";
/**
 * Created by Vlad on 17/10/2016.
 */
export class Package {
    public id : number;
    public name : string;
    public price : number;
    public visible : boolean;
    public attributes : PackageAttribute[];
    public weddingAgency : Agency;
}