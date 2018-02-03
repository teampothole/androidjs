require('dotenv').config();
console.log(process.env.IRI_URL);

const express = require('express');
const Publish = require('./publish');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/notify', function (req, res) {
  //todo: this is just notification. Return here.
    const body = req.body;
    Publish(body).then(message => {
      res.send(message);
    });
})

app.listen(3000);