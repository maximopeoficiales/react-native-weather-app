import { Country } from "./responses/Country";
import { ResponseCountry } from "./responses/ResponseCountrys";
import { State } from "./responses/State";

export const getAllCountryCitys = async (): Promise<Country[]> => {
    const url = `https://countriesnow.space/api/v0.1/countries/states`
    try {
        let data = await (await fetch(url)).json() as ResponseCountry

        return data.data;
    } catch (error) {
        console.log(error);

        return [];
    }
}

export const getAllCountryCodes = async (): Promise<Country[]> => {
    const url = `https://countriesnow.space/api/v0.1/countries/codes`
    try {
        let data = await (await fetch(url)).json() as ResponseCountry
        return data.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}
export const getAllCountryWithFlags = async (): Promise<Country[]> => {
    const url = `https://countriesnow.space/api/v0.1/countries/flag/images?country=peru`
    try {
        let data = await (await fetch(url)).json() as ResponseCountry
        return data.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getStateByCountryAsync = async (nameCountry: string) => {
    let countrys = await getAllCountryCitys();
    return countrys.find((country: Country) => country.name === nameCountry)?.states;
}

export const getStateByCountry = (countrys: Country[], nameCountry: string) => {
    return countrys.find((country: Country) => country.name === nameCountry)?.states;
}

export const getCountryCodeByNameCountryAsync = async (nameCountry: string) => {
    let countrys = await getAllCountryCodes();
    return countrys.find((country: Country) => country.name === nameCountry)?.code;
}