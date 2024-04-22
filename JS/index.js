// HTML Elements
let searchInput = document.getElementById("Search");
let dayElement = document.querySelectorAll(".day");
let findLocationButton = document.querySelector("#Find");
let emailingButton = document.querySelector("#submit");

// App Variables
let weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let currentLocationLatLang;

// Functions
function getLocation() 
{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) 
{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    currentLocationLatLang = latitude+','+longitude;
    getData(currentLocationLatLang);
}

async function getData(searchTerm)
{
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f33bcc4967c1432db7e125037240704&q=${searchTerm}&days=3`);
        var data = await response.json();
        console.log(data);
        assignData(data);
    } catch (error) {
        getData(currentLocationLatLang);
    }
}

function assignData(data)
{
    for (let i = 0; i < dayElement.length; i++) 
    {
        if(i == 0)
        {
            dayElement[i].children[0].textContent = weekDays[new Date(data.forecast.forecastday[i].date).getDay()];
            dayElement[i].children[1].textContent = `${new Date(data.forecast.forecastday[i].date).getDate()} ${month[new Date(data.forecast.forecastday[i].date).getMonth()]}`;
            
            dayElement[i].nextElementSibling.children[0].textContent = data.location.name;
            dayElement[i].nextElementSibling.querySelector('p.temp').textContent = `${data.forecast.forecastday[i].day.avgtemp_c}°C`;
            dayElement[i].nextElementSibling.querySelector('img').setAttribute('src',`https:${data.forecast.forecastday[i].day.condition.icon}`);
            dayElement[i].nextElementSibling.children[2].textContent = data.forecast.forecastday[i].day.condition.text;
        }
        else
        {
            dayElement[i].children[0].textContent = weekDays[new Date(data.forecast.forecastday[i].date).getDay()].substring(0,3);
            dayElement[i].nextElementSibling.children[0].setAttribute('src',`https:${data.forecast.forecastday[i].day.condition.icon}`);
            dayElement[i].nextElementSibling.children[1].textContent = `${data.forecast.forecastday[i].day.maxtemp_c}°C`;
            dayElement[i].nextElementSibling.children[2].textContent = `${data.forecast.forecastday[i].day.mintemp_c}°C`;
            dayElement[i].nextElementSibling.children[3].textContent = data.forecast.forecastday[i].day.condition.text;
        }
    }
}

// Events
emailingButton.addEventListener('click',function(e){
    e.preventDefault();
})

findLocationButton.addEventListener('click',function(e){
    e.preventDefault();
    getData(searchInput.value);
})

searchInput.addEventListener('input', function(){
    getData(searchInput.value);
})


getLocation();
/*
Get User Current Location ===> Set it to Defualt 
===> display Weather for current location
*/