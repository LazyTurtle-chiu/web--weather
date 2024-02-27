const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temperature");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const nameOutput = document.querySelector(".name");
const conditionOutput = document.querySelector(".condition");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

let cityInput = "Manila";
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0";
  });
});

form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
  }
  e.preventDefault();
});

// get the month of the year
function monthOfTheYear(monthNumber) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber];
}

// get the day of the week
function dayOfTheWeek(day, month, year) {
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return week[new Date(`${month}/${day}/${year}`).getDay()];
}
function fetchWeatherData() {
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=564d2fad166c4cd2b7e135254242002&q=${cityInput}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // print temperature
      temp.innerHTML = data.current.temp_c + "&#176;";
      console.log(temp);
      //   print weather condition
      conditionOutput.innerHTML = data.current.condition.text;
      console.log(conditionOutput);
      //   locate date
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      //   print day of the week month day year
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${monthOfTheYear(
        m
      )} ${d}, ${y}`;
      console.log(dateOutput);
      //   locate time
      const time = date.substr(11);
      //   print time
      timeOutput.innerHTML = time;
      //   print location
      nameOutput.innerHTML = data.location.name;
      console.log(nameOutput);
      // icon code
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );
      console.log(iconId);
      //   print icon
      icon.src = "./icons/64x64/" + iconId;
      //   print cloud
      cloudOutput.innerHTML = data.current.cloud + "%";
      //   print humidity
      humidityOutput.innerHTML = data.current.humidity + "%";
      //   print wind speed
      windOutput.innerHTML = data.current.wind_kph + "kph";

      // check day or night
      let timeOfDay = "day";
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      const code = data.current.condition.code;
      console.log(code);
      // clear bg image
      if (code == 1000) {
        app.style.backgroundImage = `url(./img/${timeOfDay}/clear.jpg)`;
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      }
      // cloudy bg image
      else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./img/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";

        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./img/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        //         if (timeOfDay == "night") {
        //           btn.style.background = "#325c80";
      } else {
        app.style.backgroundImage = `url(./img/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }
      app.style.opacity = "1";
    })
    .catch(() => {
      alert("City not found. Please try again");
      app.style.opacity = "1";
    });
}
fetchWeatherData();
app.style.opacity = "1";
