import { BodyRequestLogin, BodyResponseLogin, BodyResponseCreateUser, BodyRequestCreateUser } from "../models/auth.model";

export class AuthController {
    public domain: string;

    constructor(domain: string){
        this.domain = domain;
    }

    async register(email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseCreateUser> {
        const newUser: BodyRequestCreateUser = {
            email: email.value,
            password: password.value,
        };
  
        const headers: Record<string, string> = {
          'accept': '*/*',
          'Content-Type': 'application/json',
        }
  
        const reqOptions: RequestInit = {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(newUser),
        }
  
        const response: Response = await fetch(`${this.domain}/api/register`, reqOptions);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyRegister: BodyResponseCreateUser = await response.json();
        return responseBodyRegister;
    }

    async login(email: HTMLInputElement, password: HTMLInputElement): Promise<BodyResponseLogin>{
        const userData: BodyRequestLogin = {
            email: email.value,
            password: password.value
        };
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        const reqOptions: RequestInit = {
            method: 'POST',
            headers,
            body: JSON.stringify(userData)
        }
        const response = await fetch(`${this.domain}/api/login`, reqOptions);

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseBodyLogin: BodyResponseLogin = await response.json();
        return responseBodyLogin;
    }
}