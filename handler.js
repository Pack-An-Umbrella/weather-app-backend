'use strict';

// const cors = require('cors');
// app.use(cors()); 

module.exports.weather = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `What's the weather and do I need to pack an umbrella?`,
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
