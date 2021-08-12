import { State } from "./State";

export interface Country {
    name: string;
    code?: string;
    dial_code?: string;
    flag?: string;
    states?: State[];
}