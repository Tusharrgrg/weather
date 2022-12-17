const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const apiKey = "af0483d6155351656c86d794501f7acf";
  const query = req.body.cityName;
  const unit = "metric";

  const weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +query +"&units=" +unit +"&appid="+apiKey;
  https.get(weatherURL, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>The temperature of " + query + " is " + temp + " degree celcius</h1>");
      res.write("<p>weather condition : " + description + "</p>");
      res.write("<img src=" + iconUrL + ">");
      res.send();
      console.log(query);
    });
  });
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("server running on 3000 port");
});
