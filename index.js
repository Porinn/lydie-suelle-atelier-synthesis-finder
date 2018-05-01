const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

const path = require('path');

/* MODULE LOADING */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* API LOADING */
app.use('/api', require('./api'));

/* REACT LOADING */
app.use('/static', express.static(path.resolve('./build/static')));
app.use('/favicon.ico', express.static(path.resolve('./favicon.ico')));
app.get('*', (req, res, next) => {
  if (req.url.split("/")[1] === 'api') {
    return next();
  }
  else {
    res.sendFile(path.resolve('./build/index.html'));
  }
});

app.listen(80, () => {
  console.log("Finder Running...");
});
