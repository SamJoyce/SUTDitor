const express = require('express');

const app = express();

app.use(express.static(__dirname + '/views/public'));

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.listen(process.env.PORT || 8080, err => {
  if (err) throw err;
  console.log('UP AND RUNNING AT ' + (process.env.PORT || 8080) );
});
