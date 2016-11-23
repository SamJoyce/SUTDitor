const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://stanley:stanley123@ds157187.mlab.com:57187/sutditor');

const app = express();

app.use(express.static(__dirname + '/views/public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(require('./controllers'));

app.listen(process.env.PORT || 8080, (err) => {
  if (err) throw err;
  console.log('UP AND RUNNING AT ' + (process.env.PORT || 8080) ); //eslint-disable-line
});
