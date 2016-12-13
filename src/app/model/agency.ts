import {Country} from "./country";
import {Package} from "./package";
/**
 * Created by Vlad on 16/10/2016.
 */
export class Agency {
    public id: number;
    public name: string;
    public country: Country;
    public city: string;
    public email: string;
    public phone: string;
    public description: string;
    public website: string;
    public facebook: string;
    public teitter: string;
    public instagram: string;
    public seolink: string;
    public visible: boolean;
    public packages: Package[];
}
