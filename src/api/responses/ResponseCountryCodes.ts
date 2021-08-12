import { Country } from "./Country";

export interface ResponseContry {
    error: boolean;
    msg: string;
    data: Country[];
}