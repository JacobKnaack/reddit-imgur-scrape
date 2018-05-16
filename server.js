const express = require('express');
const app = express();
const jsonParser = require('body-parser').json();
const morgan = require('morgan');
const fetch = require('node-fetch');

const ImageScrape = require('./lib/imageScrape.js');
const PORT = process.env.PORT || 3030;

app.use(morgan('dev'));
app.post('/', jsonParser, (req, res) => {
  fetch(`${req.body.url}/.json`)
    .then(res => res.json())
    .then(async (data) => {
      let images = await ImageScrape(data);
      res.send(images);
    })
    .catch(err => console.error(err));
});

app.listen(PORT, () => {
  console.log('Reddit Image Scrapper up ::: ' + PORT);
})
