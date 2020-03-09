const fetch = require('node-fetch');


//get request for day and night weather values from Met Office API

fetch('placeholder_API_key')
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
      maxUVIndex: { name: 'U', units: '', humanText: 'Max UV Index', value: forecastObject.U },
      weather: { name: 'W', units: '', humanText: 'Weather Type', value: forecastObject.W, humanReadableValue: covertWeather(forecastObject.W)},
      precipationDay: { name: 'PPd', units: '%', humanText: 'Precipitation Probability Day', value: forecastObject.Ppd },
      precipationNight: { name: 'PPn', units: '%', humanText: 'Precipitation Probability Night', value: forecastObject.Ppn }

    }
}


