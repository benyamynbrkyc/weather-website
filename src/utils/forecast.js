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
      console.log(body.currently);

      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} celsius.\nFeels like ${body.currently.apparentTemperature} celsius. There is ${body.currently.precipProbability} chance of rain.\nAtmospheric pressure is ${body.currently.pressure}`
      );
    }
  });
};

module.exports = forecast;
