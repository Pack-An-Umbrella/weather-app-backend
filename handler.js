'use strict';

const fetch = require('node-fetch');
require('dotenv').config();
const cors = require('cors');
app.use(cors()); 
const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());

// module.exports.weather = async event => {
  // return {

    const api_key: process.env.API_KEY
    // const loc_id: process.env.LOC_ID
    
    app.get ('/weather', async (req, res) => {
      const api_url = `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/3772?res=3hourly&key=${api_key}`;
      const fetch_response = await fetch (api_url);
      const json = await fetch_response.json();
      response.json(json);
    });

    // statusCode: 200,
    // body: JSON.stringify(
    //   {
    //     message: `What's the weather and do I need to pack an umbrella?`,
    //     input: event,
    //   },
    //   null,
    //   2
    // ),

  module.exports.weather = serverless(app);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
