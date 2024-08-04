import {AuthController } from "./controller.auth";
import { successAlert, errorAlert } from "../components/alerts.ts";
const URL_LOGIN: string = "https://reqres.in";
const form = document.querySelector("form") as HTMLFormElement;
const email = document.getElementById("floatingInput") as HTMLInputElement;
const password = document.getElementById("floatingPassword") as HTMLInputElement;
console.log(email.value)
console.log(password.value)
form.addEventListener("submit", async (e:Event)=>{
    e.preventDefault();
    const auth = new AuthController(URL_LOGIN);
    try {
        console.log("entre al login")
        const response = await auth.login(email, password);
        const token = response.token;
        console.log(response);
        if(token){
            successAlert("Login success")
            localStorage.setItem("token", token);
            window.location.href = "src/views/home.html";
            return;
        }else{
            errorAlert("Login failed");
        }
        form.reset();
    } catch (error) {
        console.error(error);
    }
})