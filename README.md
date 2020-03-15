## weather-app-backend

## Welcome - Getting Started to 'Pack An Umbrella' API

'Pack An Umbrella' application relies on real-time weather information provided by open data sets from the Met Office, accessed through their DataPoint API. 

Our API hosts calls to Met Office API, and helps to translate that third party data in order to give human readable weather recommendations to our end-user.

## How to get the API key working

To enable this API, you will need to gain an access key to Met Office DataPoint API. You can do so, here: https://www.metoffice.gov.uk/services/data/datapoint

Once you have authentication, follow these steps:

- Create an `.env` file (same level as .json and .js files)
- Within the `.env` file write this:

    API_KEY = XXXX <br>

Ensure your `.env` file is included in `.gitignore`. This will ensure your API reads your access key in a non-public way. 

## How to run the app

Finally, make sure your dependencies are up to date, to do this: `npm install`

## Further Information

Please note, the Met Office API is unsupported. Further documentation can be found here: https://www.metoffice.gov.uk/binaries/content/assets/metofficegovuk/pdf/data/datapoint_api_reference.pdf


<!-- The LOC_ID is hardcoded for now, but once we have the submit button connected to an API, this will change. -->
