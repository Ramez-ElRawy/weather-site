var searchInput = document.getElementById("Search");
var dayElement = document.querySelectorAll(".day");
var latitude;
var longitude;
var weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

var currentLocationLatLang;

searchInput.addEventListener('input', function(){
    getData(searchInput.value);
})

async function getData(searchTerm)
{
    try {
        var response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f33bcc4967c1432db7e125037240704&q=${searchTerm}&days=5`);
        var data = await response.json();
        // console.log(data);
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
            
            dayElement[i].nextElementSibling.querySelector('h2').textContent = `${data.forecast.forecastday[i].day.avgtemp_c}°C`;
            dayElement[i].nextElementSibling.querySelector('img').setAttribute('src',`https:${data.forecast.forecastday[i].day.condition.icon}`);
            dayElement[i].nextElementSibling.children[2].textContent = data.forecast.forecastday[i].day.condition.text;
        }
        else
        {
            dayElement[i].children[0].textContent = weekDays[new Date(data.forecast.forecastday[i].date).getDay()];
            dayElement[i].nextElementSibling.children[0].setAttribute('src',`https:${data.forecast.forecastday[i].day.condition.icon}`);
            dayElement[i].nextElementSibling.children[1].textContent = `${data.forecast.forecastday[i].day.maxtemp_c}°C`;
            dayElement[i].nextElementSibling.children[2].textContent = `${data.forecast.forecastday[i].day.mintemp_c}°C`;
            dayElement[i].nextElementSibling.children[3].textContent = data.forecast.forecastday[i].day.condition.text;
        }
    }
}

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
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    currentLocationLatLang = latitude+','+longitude;
    getData(currentLocationLatLang);
    // console.log(currentLocationLatLang);
    // console.log(latitude);
    // console.log(longitude);
}

getLocation();
console.log(dayElement);

/* 
Get User Current Location ===> Set it to Defualt ===> display Weather for current location


*/
