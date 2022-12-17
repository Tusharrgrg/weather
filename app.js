const express = require('express');
const https = require('https');
const app = express();



const weatherURL =
  "https://api.openweathermap.org/data/2.5/weather?q=Jaipur&units=metric&appid=af0483d6155351656c86d794501f7acf";

app.get('/', (req,res)=>{

    
    https.get(weatherURL , (response)=>{
        response.on("data", (data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperature of jaipur is :"+ temp + "</h1>");
            res.write("<p>weather condition : " + description +"</p>");
            res.write("<img src=" + iconUrL+ ">")
            res.send();
            // console.log(temp, icon);
        });
        // console.log(response);
    });
});


app.listen(3000 , (err)=>{
    if(err){
        console.log(err);
    }
    console.log("server running on 3000 port");
})