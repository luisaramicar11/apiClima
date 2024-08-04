// guardian
(function (){
    const userToken = localStorage.getItem('token')
    if(userToken === null){
        window.location.href = "/"
    }
})()
import {CityController} from "./controller.cities";
import {ClimateController} from "./controllerTemperature";
import {CardTemplateController} from "./controller.CardTemplateCity";
import {errorAlert} from "../components/alerts";
import {colorForTemperature} from "./controller.color";
//import {showModal} from "../components/modal";
import loader from "../components/loader";
import Logout from "../components/btnLogout.ts";

const URL_CLIMATE:string = "https://api.openweathermap.org/data/2.5";
const URL_CITIES:string = "http://localhost:3000";
const token = localStorage.getItem("token");
const btnLogout = document.querySelector(".btn-logout") as HTMLButtonElement;

btnLogout.addEventListener("click", ()=>{
    Logout();
})

if(!token){
    alert("Authentication token is missing. Please log in.");
    window.location.href = "index.html";
}else{
    const containerCities = document.querySelector(".container-cities") as HTMLDivElement;

const cardTemplate = new CardTemplateController(containerCities);

async function allCities(){
    const crudCities = new CityController(URL_CITIES);
    const crudClimate = new ClimateController(URL_CLIMATE);
    const imgLoader = loader();
    try {
        containerCities.innerHTML = "";
   
        containerCities.appendChild(imgLoader);

        const cities = await crudCities.getAllCities();
        //console.log(cities)
        // Limpia el contenedor antes de agregar las nuevas tarjetas
        containerCities.innerHTML = "";
        for (const city of cities){
            const responseClimate = await crudClimate.temperatureCity(city.city);
            const temperature = responseClimate.main.temp;
            //console.log(temperature)
            let color = colorForTemperature(temperature);
            cardTemplate.render(city.id, city.country, city.city, city.image, temperature, color);

        }
       
    } catch (error:any) {
        errorAlert(error)
    }
}

allCities()
};