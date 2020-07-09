const api = {
    key: "a0dcf8351827a72b674ded93d84d4434",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchfield = document.querySelector('.search-field');
searchfield.addEventListener('keypress', setQuery);

function setQuery (evt) {
    if(evt.keyCode == 13) {
        getResults(searchfield.value);
        console.log(searchfield.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    if(weather.message=="city not found"){
        alert("Please enter valid name");
    }
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    //city.innerText = weather.name +""+ weather.sys.country;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.status .temperature');
    temperature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.status .weather');
    weather_el.innerText = weather.weather[0].main;

    let lowhi = document.querySelector('.low-hi');
    lowhi.innerText = `${Math.round(weather.main.temp_min)}°c/ ${Math.round(weather.main.temp_max)}°c`;

    function dateBuilder (d){
        let months = ["January","Febuary","March","April","May","June",
        "July","August","September","October","November","December"];
        let days = ["Monday","Tuesday","Wednesday","Thursday","Friday",
        "Saturday", "Sunday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }
}
