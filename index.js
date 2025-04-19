// JS

const express = require("express");
const App = express();
const bodyParser = require("body-parser")
const https = require("https");
const { log } = require("console");
App.set("view engine","ejs");
App.use(express.static("public"));
App.use(bodyParser.urlencoded({extended:true}))
App.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html")


})
App.post("/home",function(req,res){
    const query = req.body.Location;

    const url = "https://api.weatherapi.com/v1/current.json?key=%20b13d33af9f0346aca8b124004252602&q="+query+"&aqi=no";

https.get(url, function(response){
    console.log(response.statusCode)
response.on("data", function(data){
    const weatherData = JSON.parse(data)
    console.log(weatherData)

    const temp = weatherData.current.temp_c;
     console.log(temp);
     const cond = weatherData.current.condition.text;
     console.log(cond);
     const icon = weatherData.current.condition.icon;
     console.log(icon);
     const place = weatherData.location.name;
     console.log(place)

     res.write(`<p>The Weather Condition In ${place} is ${cond}</p>`)
     res.write(`<h1>The Temperature is ${temp} Celcius</h1>`)
     res.write(`<img src=${icon}>`)
})



    
})



    

})

App.get("/home",function(req,res){
    res.render("home")
})



const port = process.env.PORT || 3000;

App.listen(port, function(){
    console.log(`The Port Is ${port}`);
})
