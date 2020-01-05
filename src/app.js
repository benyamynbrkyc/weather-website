const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const public_dir_path = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path);

// set up static directory to serve
app.use(express.static(public_dir_path));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Benjamin Brkic'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Benjamin Brkic'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    help_message:
      'You can ask for help and anything you are interested in at benjamin.brkic@gmail.com',
    name: 'Benjamin Brkic'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address)
    return res.send({
      error: 'You must provide an address'
    });

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error)
        return res.send({
          error: error
        });

      forecast(latitude, longitude, (error, forecastData) => {
        if (error)
          return res.send({
            error: error
          });
        return res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    error_msg: 'Help article not found!',
    name: 'Benjamin Brkic'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    error_msg: 'Error 404: Page not found.',
    name: 'Benjamin Brkic'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
