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
import {successAlert, deleteAlert, modalAlert, errorAlert} from "../components/alerts";
import {colorForTemperature} from "./controller.color";
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
const form = document.querySelector("form") as HTMLFormElement;
const country = document.getElementById("country") as HTMLInputElement;
const city = document.getElementById("city") as HTMLInputElement;
const analize = document.querySelector(".analyze") as HTMLTextAreaElement;
const image = document.getElementById("imagen") as HTMLInputElement;
let idCatche: undefined | string;

const cardTemplate = new CardTemplateController(containerCities);

form.addEventListener("submit", async (e:Event)=>{
    e.preventDefault();
    const crudCities = new CityController(URL_CITIES);
    successAlert("Successfully created city");

    if(idCatche === undefined){
        await crudCities.addCity(country, city, image, analize)
    }else{
        await crudCities.updateCity(idCatche, country, city, image, analize);
        idCatche = undefined;
        successAlert("Successfully updated city");
    }
    form.reset();
    await allCities();
});

containerCities.addEventListener("click", async (e:Event)=>{
    if(e.target instanceof HTMLButtonElement){
        const crudCities = new CityController(URL_CITIES);

        if(e.target.classList.contains("btn-warning")){
            idCatche= e.target.dataset.id;

            if(idCatche){
                const cityData = await crudCities.getById(idCatche);
                country.value = cityData.country;
                city.value = cityData.city;
                image.value = cityData.image;
                analize.value = cityData.reasonForAnalysis;
            }
        }else if(e.target.classList.contains("btn-danger")){
            let cityId = e.target.dataset.id;

            if(cityId){
                deleteAlert("You won't be able to revert this!").then(async (result)=>{
                    //console.log(result)
                    //console.log(result.isConfirmed)
                    if(result.isConfirmed){
                        await crudCities.deleteCity(cityId);
                        idCatche = undefined;
                        successAlert("Successfully delete city");
                        await allCities();
                    }else{
                        errorAlert("Ocurrio un error al borrar la ciudad")
                    }
                })                
            }
        } else if (e.target.classList.contains("btn-primary")){
            idCatche=e.target.dataset.id;
            if(idCatche){
                const cityDetails= await crudCities.getById(idCatche);
                modalAlert(cityDetails.reasonForAnalysis, cityDetails.date)
            } 
            idCatche = undefined;
        }
    }
})

async function allCities(){
    const crudCities = new CityController(URL_CITIES);
    const crudClimate = new ClimateController(URL_CLIMATE);
    const imgLoader = loader();
    try {
        containerCities.innerHTML = "";
   
        containerCities.appendChild(imgLoader);

        const cities = await crudCities.getAllCities();
        //console.log(cities)
        localStorage.setItem("cities", JSON.stringify(cities));
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
 
