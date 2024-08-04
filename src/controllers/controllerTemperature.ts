import {BodyResponseClimate} from "../models/climate.model";

export class ClimateController {
    public domain: string;

    constructor(domain:string){
        this.domain = domain;
    }

    async temperatureCity(city:string): Promise<BodyResponseClimate>{
        console.log(city);
        const response = await fetch(`${this.domain}/weather?q=${city}&appid=a690df0ab5fc04d10597a27f2f0c4a0d`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyClimate: BodyResponseClimate = await response.json();
        return responseBodyClimate;
    }
}