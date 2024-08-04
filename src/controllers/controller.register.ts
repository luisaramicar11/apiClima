import { AuthController } from "./controller.auth.ts";
import { successAlert, errorAlert } from "../components/alerts.ts";

const URL_USERS: string = "https://reqres.in";
const form = document.querySelector("form") as HTMLFormElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const confirmPassword = document.getElementById("confirm-password") as HTMLInputElement;

// form submit event to register a user
form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    const checklengthPasswords: boolean = lengthPasswords(password);
    const checkPasswordAndConfirmPassword: boolean = checkPasswords(password, confirmPassword);
    if (checkPasswordAndConfirmPassword && checklengthPasswords) {
        const registerUser = new AuthController(URL_USERS);
        try {
            await registerUser.register(email, password);
            successAlert("Success user created");
            console.log("Success user created");
            window.location.href = "index.html";
        } catch (error) {
            if (error instanceof Error) {
                errorAlert(error.message);
            } else {
                errorAlert("An unknown error occurred");
            }
        }
    }
    form.reset();
});

// function to validate if password and confirm password are the same
function checkPasswords(password: HTMLInputElement, confirmPassword: HTMLInputElement): boolean {
    if (password.value === confirmPassword.value) {
        return true;
    } else {
        errorAlert("Passwords do not match");
        return false;
    }
}

// function to validate that the password has 6 or more characters
function lengthPasswords(password: HTMLInputElement): boolean{
    if(password.value.length >= 6){
        return true;
    }else{
        errorAlert("Password must contain at least 6 characters");
        return false;
    }
}

