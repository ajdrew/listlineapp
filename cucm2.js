const express = require('express')
const path = require("path")
const bodyParser = require("body-parser")
const app = express()

// STATIC RESOURCES
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// EXPRESS ROUTE - INDEX
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+ '/public/cucm2.html'), {
    'title': 'CUCM 2.0'
  });
})

// EXPRESS ROUTE - RESULTS
app.get('/cucmmapper-results', function (req, res) {
  res.sendFile(path.join(__dirname+ '/public/cucm2-results.html'), {
    'title': 'CUCM 2.0'
  });
})

// EXPRESS ROUTING - INCLUDE - CUCM Mapper
var routingextensions = require(__dirname+ '/routes/cucmmapper.js')(app);

// APP
app.listen(3000, function () {
  console.log('CUCM 2.0 listening on port 3000!')
})