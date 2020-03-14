'use strict';

const fetch = require('node-fetch');
const cors = require('cors');
const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
console.log("Express has started");
const api_key = process.env.API_KEY;
    

app.get ('/weather/:location', async (req, res) => {
  const location = req.params.location;
  console.log(`Serving GET request for location: ${location}`);
  const api_url = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${location}?res=3hourly&key=${api_key}`;
  const fetch_response = await threeHourFetcher(api_url);
  console.log(fetch_response); 
  const json = fetch_response;
  res.json(json);
});

const threeHourFetcher = (api_url) => {
  return fetch(api_url)
    .then(res => res.json())
        .then(json => {
            return {
                nextThreeHours: json.SiteRep.DV.Location.Period[0].Rep[0],
                inSixHours: json.SiteRep.DV.Location.Period[0].Rep[1],
                inNineHours: json.SiteRep.DV.Location.Period[0].Rep[2],
                inTwelveHours: json.SiteRep.DV.Location.Period[0].Rep[3]
            }
        })
        .then(json => {
            return {
                nextThreeHours: convertToHumanReadable(json.nextThreeHours),
                inSixHours: convertToHumanReadable(json.inSixHours),
                inNineHours: convertToHumanReadable(json.inNineHours),
                inTwelveHours: convertToHumanReadable(json.inTwelveHours)
            }
        });

}
const convertToHumanReadable = (forecastObject) => {
  return {
      feelsLikeTemperature: { name: 'F', units: 'C', humanText: 'Feels Like Temperature', value: forecastObject.F },
      // windGust: { name: 'G', units: 'mph', humanText: 'Wind Gust', value: forecastObject.G },
      // screenRelativeHumidity: { name: 'H', units: '%', humanText: 'Screen Relative Humidity', value: forecastObject.H },
      temperature: { name: 'T', units: 'C', humanTest: 'Temperature', value: forecastObject.T },
      // visibility: { name: 'V', units: '', humanText: 'Visibility', value: forecastObject.V },
      // windDirection: { name: 'D', units: 'compass', humanText: 'Wind Direction', value: forecastObject.D },
      // windSpeed: { name: 'S', units: 'mph', humanText: 'Wind Speed', value: forecastObject.S },
      maxUVIndex: { name: 'U', units: '', humanText: 'Max UV Index', value: forecastObject.U, humanReadableValue: convertUV(forecastObject.U) },
      weather: { name: 'W', units: '', humanText: 'Weather Type', value: forecastObject.W, humanReadableValue: convertWeather(forecastObject.W) },
      precipationProbability: { name: 'PP', units: '%', humanText: 'Chance of Rain', value: forecastObject.Pp }
  }
}

const convertWeather = (weatherCode) => {
  const weatherMapping = {
      NA: "Not available",
      0: "Clear night",
      1: "Sunny day",
      2: "Partly cloudy (night)",
      3: "Partly cloudy (day)",
      4: "Not used",
      5: "Mist",
      6: "Fog",
      7: "Cloudy",
      8: "Overcast",
      9: "Light rain shower (night)",
      10: "Light rain shower (day)",
      11: "Drizzle",
      12: "Light rain",
      13: "Heavy rain shower (night)",
      14: "Heavy rain shower (day)",
      15: "Heavy rain",
      16: "Sleet shower (night)",
      17: "Sleet shower (day)",
      18: "Sleet",
      19: "Hail shower (night)",
      20: "Hail shower (day)",
      21: "Hail",
      22: "Light snow shower (night)",
      23: "Light snow shower (day)",
      24: "Light snow",
      25: "Heavy snow shower (night)",
      26: "Heavy snow shower (day)",
      27: "Heavy snow",
      28: "Thunder shower (night)",
      29: "Thunder shower (day)",
      30: "Thunder"
  }

  return weatherMapping[weatherCode];

}

const convertUV = (uvCode) => {
  const uvMapping = {
      0: "Low exposure",
      1: "Low exposure",
      2: "Low exposure",
      3: "Moderate exposure",
      4: "Moderate exposure",
      5: "Moderate exposure",
      6: "High exposure",
      7: "High exposure",
      8: "Very high exposure",
      9: "Very high exposure",
      10: "Extreme exposure",
      11: "Extreme exposure"
  }
  return uvMapping[uvCode];
}

module.exports.weather = serverless(app);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
