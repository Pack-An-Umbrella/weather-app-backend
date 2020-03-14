'use strict';

const fetch = require('node-fetch');
require('dotenv').config();
const cors = require('cors');
const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
console.log("Express has started");
// const api_key = process.env.API_KEY;
    

app.get ('/weather', async (req, res) => {
  const location = req.query.location;
  console.log(`Serving GET request for location: ${location}`);
  const api_url = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${location}?res=3hourly&key=${api_key}`;
  const fetch_response = await fetch (api_url);
  const json = await fetch_response.json();
  response.json(json);
});

module.exports.weather = serverless(app);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
