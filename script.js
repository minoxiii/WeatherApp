const WAPI = `https://api.openweathermap.org/data/2.5/weather?q=`;
const AKEY = `ba791b84cedde7a962a247256f519444`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// fetching api 
async function weather(city) {
  const response = await fetch(`http://localhost/prototype2/connection.php?q=${cityName}`);
  // var data = await response.json();
  var data = response.json();

  return data;
}

function displayWeatherData(data2) {
  //to check fetched data
  console.log(data2);

  if (!data2 || data2.cod === "404") {
    // City not found
    document.querySelector(".city").innerHTML = "City not found";
    document.querySelector(".temp").innerHTML = "404";
    document.querySelector(".humidity").innerHTML = "";
    document.querySelector(".wind").innerHTML = "";
    weatherIcon.src = "";
    document.body.style.backgroundImage = "none";
    return;} else{


  // Stored required data in variable
  let temp = Math.round(data2.main.temp);
  let wind = data2.wind.speed;
  let place = data2.name;
  let humidity = data2.main.humidity;

  // to check the incoming data 
  console.log(temp + " °C");
  console.log(wind + " km/h");
  console.log(place);
  console.log(humidity + "%");

  // To display weather data
  document.querySelector(".city").innerHTML = place;
  document.querySelector(".temp").innerHTML = temp + "°C";
  document.querySelector(".humidity").innerHTML = humidity + "%";
  document.querySelector(".wind").innerHTML = wind + " km/h";



  if (data2.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
    document.body.style.backgroundImage = "url('img/clouds.jpg')";

  } else if (data2.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
    document.body.style.backgroundImage = "url('img/clear.jpg')";


  } else if (data2.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
    document.body.style.backgroundImage = "url('img/rain.jpg')";
    document.querySelector(".container").style.background= "#04fff765";
    


  } else if (data2.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
    document.body.style.backgroundImage = "url('img/drizzle.jpg')";


  } else if (data2.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
    document.body.style.backgroundImage = "url('img/mist.jpg')";

  } else if (data2.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png";
    document.body.style.backgroundImage = "url('img/snow.jpg')";


  } else if (data2.weather[0].main == "Haze") {
    weatherIcon.src = "images/haze.png";
    document.body.style.backgroundImage = "url('img/haze.jpg')";
    document.querySelector(".container").style.background= "#fffdfd33";



  } else if (data2.weather[0].main == "Thunderstorm") {
    weatherIcon.src = "images/thunderstorm.png";
    document.body.style.backgroundImage = "url('img/thunderstor.jpg')";

  }
  
  else {
    weatherIcon.src = "images/invalid.png";

    document.body.style.backgroundImage = "none";


  }

}

}

// Weather data by Searching
searchBtn.addEventListener("click", async () => {
  const city = searchBox.value;
  const data2 = await weather(city);
  displayWeatherData(data2);
});

// Display defult city data
weather("North East Lincolnshire")

  .then((data2) => displayWeatherData(data2))


  .catch((error) => {
    console.log("Error due to:", error);
  });

  