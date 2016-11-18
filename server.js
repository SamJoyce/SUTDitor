const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('hello there');
});

app.listen(process.env.PORT || 8080, (err) => {
  if (err) throw err;
  console.log('UP AND RUNNING AT ' + (process.env.PORT || 8080) ); //eslint-disable-line
});
