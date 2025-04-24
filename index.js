const express = require("express");
const App = express();
const bodyParser = require("body-parser");
const https = require("https");

App.set("view engine", "ejs");
App.use(express.static("public"));
App.use(bodyParser.urlencoded({ extended: true }));

App.get("/", function (req, res) {
    const query = "Gilgit";
    const url = "https://api.weatherapi.com/v1/current.json?key=b13d33af9f0346aca8b124004252602&q=" + query + "&aqi=no";

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.current.temp_c;
            console.log(temp);
            const cond = weatherData.current.condition.text;
            console.log(cond);
            const icon = weatherData.current.condition.icon;
            console.log(icon);
            const place = weatherData.location.name;
            console.log(place);
            const humidity = weatherData.current.humidity; // Corrected
            console.log(humidity);
            const feelslike = weatherData.current.feelslike_c;
            console.log(feelslike);
            const visibility = weatherData.current.vis_km;
            console.log(visibility);

            res.render("index", { temp: temp, cond: cond, icon: icon, place: place, humidity: humidity, feelslike: feelslike, visibility: visibility });
        });
    }).on("error", function (e) {
        console.error(`Got error: ${e.message}`);
        res.send("Error fetching weather data.");
    });
});

App.post("/home", function (req, res) {
    const query = req.body.Location;
    const url = "https://api.weatherapi.com/v1/current.json?key=b13d33af9f0346aca8b124004252602&q=" + query + "&aqi=no";

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);

            const temp = weatherData.current.temp_c;
            console.log(temp);
            const cond = weatherData.current.condition.text;
            console.log(cond);
            const icon = weatherData.current.condition.icon;
            console.log(icon);
            const place = weatherData.location.name;
            console.log(place);
            const humidity = weatherData.current.humidity; // Corrected
            console.log(humidity);
            const feelslike = weatherData.current.feelslike_c;
            console.log(feelslike);
            const visibility = weatherData.current.vis_km;
            console.log(visibility);

            res.render("result", { temp: temp, cond: cond, icon: icon, place: place, humidity: humidity, feelslike: feelslike, visibility: visibility });
        });
    }).on("error", function (e) {
        console.error(`Got error: ${e.message}`);
        res.send("Error fetching weather data.");
    });
});

App.get("/home", function (req, res) {
    res.render("home");
});

const port = process.env.PORT || 3000;

App.listen(port, function () {
    console.log(`The Port Is ${port}`);
});
