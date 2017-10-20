
// APP - INCLUDE
const express = require('express')
const path = require("path")
const bodyParser = require("body-parser")
const hbs = require('hbs')
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

// APP - DEFINITION
const app = express()

// APP - BUILD
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('html', require('hbs').__express);
app.set('view engine', 'html');

// EXPRESS ROUTE - INDEX
app.get('/', function (req, res) {
  res.render(path.join(__dirname+ '/views/index.html'), {
    'title': 'CUCM 2.0'
  });
})

// // EXPRESS ROUTE - RESULTS
app.get('/cucmmapper-results', function (req, res) {
  res.sendFile(path.join(__dirname+ '/public/cucm2-results.html'), {
    'title': 'CUCM 2.0'
  });
})

// EXPRESS ROUTING - INCLUDE - CUCM MAPPER
var routingextensions = require(__dirname+ '/routes/cucmmapper.js')(app);

// APP - START
app.listen(3000, function () {
  console.log('CUCM 2.0 listening on port 3000!')
})