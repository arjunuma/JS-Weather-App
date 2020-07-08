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
    fetch('${api.base}weather?q=${query}&units=metric&appid=${api.key}')
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = '${weather.name}, ${weather.sys.country}';

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    function dateBuilder (d){
        let months = ["January","Febuary","March","April","May","June",
        "July","August","September","October","November","December"];
        let days = ["Monday","Tuesday","Wednesday","Thursday","Friday",
        "Saturday", "Sunday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return '${day} ${date} ${month} ${year}';
    }
}
