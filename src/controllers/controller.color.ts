export function colorForTemperature(temperature: number):string{
    temperature = (temperature-273.15);
    let color:string="";
    
    if(temperature < 23){
        color= "#127fec";
    }else if (temperature >= 23 && temperature < 27){
        color= "#59b422";
    }else if (temperature >=27 && temperature < 30){
        color= "#f1f507 "
    }else{
        color= "#f51907"
    }
    console.log(color)
    return color;
}