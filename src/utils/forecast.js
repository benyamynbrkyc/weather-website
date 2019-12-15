const request = require('request');
const chalk = require('chalk');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/4d1ecff5820ee20bd8e39a087d106aa8/${latitude},${longitude}?units=si&lang=bs`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find location! / Coordinate error', undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability} chance of rain.`
      );
    }
  });
};

module.exports = forecast;
