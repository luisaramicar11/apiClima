export class CardTemplateController{
    public containerCities: HTMLDivElement;

    constructor(containerCities: HTMLDivElement){
        this.containerCities = containerCities;
    }

    render(id: string, country: string, city: string, image: string, temperature: number, color: string): void{
        const figure= document.createElement("figure");
        figure.classList.add("card");
        figure.style.width = "18rem";

        const img = document.createElement("img");
        img.src=image;
        img.classList.add("card-img-top", "object-fit-cover");
        img.alt=city;
        img.style.height = "10rem";
        figure.appendChild(img);

        const figcaption = document.createElement("figcation");
        figcaption.classList.add("card-body", "my-0");
        figure.appendChild(figcaption);

        const h5 = document.createElement("p");
        h5.classList.add("card-title");
        h5.textContent = country;
        figcaption.appendChild(h5);

        const h4 = document.createElement("p");
        h4.classList.add("card-title");
        h4.textContent = city;
        figcaption.appendChild(h4);

        const divTemperature = document.createElement("div");
        divTemperature.classList.add("d-flex", "justify-content-between", "align-items-center");
        figcaption.appendChild(divTemperature)

        const h2= document.createElement("p");
        h2.classList.add("card-title");
        h2.textContent = `${(temperature-273.15).toFixed(2)}ºC`;
        divTemperature.appendChild(h2);

        const divColor = document.createElement("div");
        divColor.style.width = "1rem";
        divColor.style.height = "1rem";
        divColor.style.backgroundColor = color;
        divColor.style.borderRadius = "50%";
        divTemperature.appendChild(divColor);

        const div = document.createElement("div");
        div.classList.add("d-flex", "justify-content-between");

        const btnEdit = document.createElement("button");
        btnEdit.classList.add("btn", "btn-warning");
        btnEdit.textContent = "Edit";
        btnEdit.type = "button";
        btnEdit.dataset.id = id;

        const btnDelete = document.createElement("button");
        btnDelete.classList.add("btn", "btn-danger");
        btnDelete.textContent = "Delete";
        btnDelete.type = "button";
        btnDelete.dataset.id = id;

        const btnDetails = document.createElement("button");
        btnDetails.classList.add("btn", "btn-primary");
        btnDetails.textContent = "Detalles";
        btnDetails.type = "button";
        btnDetails.setAttribute("data-bs-toggle","modal");
        btnDetails.setAttribute("data-bs-target","#exampleModal");
        btnDetails.dataset.id = id;
         
        div.appendChild(btnEdit);
        div.appendChild(btnDelete);
        div.appendChild(btnDetails);
        figcaption.appendChild(div);

        this.containerCities.appendChild(figure)
    }
}