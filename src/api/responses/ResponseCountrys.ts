import { Country } from "./Country";

export interface ResponseCountry {
    error: boolean;
    msg: string;
    data: Country[];
}