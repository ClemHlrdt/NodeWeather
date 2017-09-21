const api = require('./api.json');
const https = require('https');
const http = require('http');

function printError(error){
  console.error(error.message);
}

function convertKelvinToCelsius(kelvin){
    return (kelvin - 273.15).toFixed(2);
}

//print message to console
function printMessage(weather){
  const value = `Temperature for ${weather.name}, ${convertKelvinToCelsius(weather.main.temp)}°c`;
  console.log(value);
}
function getWeather(tab){
  try {
    //Connect to the API
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${tab[0]},${tab[1]}&APPID=${api.key}`;
    //console.log(url);
    const request = https.get(url, response => {
                    //console.log(url);
                    if(response.statusCode === 200){
                      let body = "";
                      //Read
                      response.on('data', data => {
                        body += data.toString();
                      });
                      response.on('end', () => {
                        //console.log(body);
                        //Parse
                        try{
                          const weather = JSON.parse(body);
                          //Print
                          printMessage(weather);
                          //console.log(weather);
                        } catch(error){
                          printError(error);
                        }
                        });
                      } else {
                          const message = `There was an error getting the weather for the zip code ${tab[0]}, ${tab[1]}, (${http.STATUS_CODES[response.statusCode]})`;
                          const statusCodeError = new Error(message);
                          printError(statusCodeError);
                      }
                  });
         request.on('error', printError);
    } catch(error){
      printError(error);
    }
  }

module.exports.get = getWeather;
