import {BodyRequestCity, BodyResponseCity} from "../models/city.model"

export class CityController {
    public domain: string;

    constructor(domain: string){
        this.domain = domain;
    }

    async addCity(country: HTMLInputElement, city: HTMLInputElement, image: HTMLInputElement, reasonForAnalysis: HTMLTextAreaElement): Promise<BodyResponseCity>{
        const cityData: BodyRequestCity = {
            country: country.value,
            city: city.value,
            image: image.value,
            reasonForAnalysis: reasonForAnalysis.value,
            date:(new Date()).toDateString(),
        };
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        const reqOptions: RequestInit = {
            method: 'POST',
            headers,
            body: JSON.stringify(cityData)
        }
        const response = await fetch(`${this.domain}/cities`, reqOptions);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyCreateCity: BodyResponseCity = await response.json()
        return responseBodyCreateCity;  
    };

    async getById(id:string): Promise<BodyResponseCity>{
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        const reqOptions: RequestInit = {
            method: 'GET',
            headers
        };
        const response: Response = await fetch(`${this.domain}/cities/${id}`, reqOptions);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyGetById: BodyResponseCity = await response.json();
        return responseBodyGetById;
    }

    async getAllCities(): Promise<BodyResponseCity[]>{
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        const reqOptions: RequestInit = {
            method: 'GET',
            headers
        }
        const response = await fetch(`${this.domain}/cities`, reqOptions);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyAllCities: BodyResponseCity[] = await response.json()
        return responseBodyAllCities;  
    };

    async updateCity(idCatche: string, country: HTMLInputElement, city: HTMLInputElement, image: HTMLInputElement, reasonForAnalysis: HTMLTextAreaElement): Promise<BodyResponseCity>{
        const cityData: BodyRequestCity = {
            country: country.value,
            city: city.value,
            image: image.value,
            reasonForAnalysis: reasonForAnalysis.value,
            date: (new Date()).toDateString(),
        };
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        console.log(cityData)
        const reqOptions: RequestInit = {
            method: 'PUT',
            headers,
            body: JSON.stringify(cityData)
        }
        const response = await fetch(`${this.domain}/cities/${idCatche}`, reqOptions);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyUpdateCity: BodyResponseCity = await response.json()
        return responseBodyUpdateCity;
    };

    async deleteCity(id: string): Promise<BodyResponseCity>{
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        const reqOptions: RequestInit = {
            method: 'DELETE',
            headers
        }
        const response = await fetch(`${this.domain}/cities/${id}`, reqOptions);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyDeleteCity: BodyResponseCity = await response.json()
        return responseBodyDeleteCity;
    }
}