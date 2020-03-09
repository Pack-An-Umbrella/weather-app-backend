const fetch = require('node-fetch');
require('dotenv').config();


//get request for day and night weather values from Met Office API

const api_key = process.env.API_KEY;

fetch(`http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/99095?res=daily&key=${api_key}`)
    .then(res => res.json())
    .then(json => {
        return {
            day: json.SiteRep.DV.Location.Period[0].Rep[0],
            night: json.SiteRep.DV.Location.Period[0].Rep[1]
        }
        })
    .then(json => {
        return {
            day: convertToHumanReadable(json.day),
            night: convertToHumanReadable(json.night),
        }
    })
    .then(readable => console.log(readable));


    // .then(json => console.log(json.SiteRep.DV.Location.Period[0].Rep[0]));

    // .then(json => console.log(json.SiteRep.Wx.Param));

// function to connect API weather values with a human-readable key 


const convertToHumanReadable = (forecastObject) => {
    return {
      feelsLikeDayMaximumTemp : { name: 'FDm', units: 'C', humanText: 'Feels Like Day Maximum Temperature', value: forecastObject.FDm},
      feelsLikeNightMaximumTemp: { name: 'FNm', units: 'C', humanText: 'Feels Like Night Minimum Temperature', value: forecastObject.FNm},
      dayMaximumTemp: { name: 'Dm', units: 'C', humanText: 'Day Maximum Temperature', value: forecastObject.Dm },
      nightMaximumTemp: { name: 'Nm', units: 'C', humanText: 'Night Minimum Temperature', value: forecastObject.Nm },
      windGustNoon: { name: 'Gn', units: 'mph', humanText: 'Wind Gust Noon', value: forecastObject.Gn },
      windGustMidnight: { name: 'Gm', units: 'mph', humanText: 'Wind Gust Midnight', value: forecastObject.Gm },
      humidityNoon: { name: 'Hn', units: '%', humanText: 'Screen Relative Humidity Noon', value: forecastObject.Hn },
      humidityMidnight: { name: 'Hm', units: '%', humanText: 'Screen Relative Humidity Midnight', value: forecastObject.Hm },
      visibility: { name: 'V', units: '', humanText: 'Visibility', value: forecastObject.V },
      windDirection: { name: 'D', units: 'compass', humanText: 'Wind Direction', value: forecastObject.D },
      windSpeed: { name: 'S', units: 'mph', humanText: 'Wind Speed', value: forecastObject.S },
      maxUVIndex: { name: 'U', units: '', humanText: 'Max UV Index', value: forecastObject.U, humanReadableValue: convertUV(forecastObject.U) },
      weather: { name: 'W', units: '', humanText: 'Weather Type', value: forecastObject.W, humanReadableValue: covertWeather(forecastObject.W)},
      precipationDay: { name: 'PPd', units: '%', humanText: 'Precipitation Probability Day', value: forecastObject.Ppd },
      precipationNight: { name: 'PPn', units: '%', humanText: 'Precipitation Probability Night', value: forecastObject.Ppn }

    }
}

//mapping of significant weather codes to human-readable values as per Met Office API documentation

const covertWeather = (weatherCode) => {
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


// mapping of UV codes to human-readable values as per Met Office API documentation

const convertUV = (uvCode) => {
    const uvMapping = {
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



