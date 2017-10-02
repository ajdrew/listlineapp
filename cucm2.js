const express = require('express')
const app = express()
const path = require("path")
// const routes = require('/routes')

// STATIC RESOURCES
app.use(express.static(path.join(__dirname, 'public')));

// EXPRESS ROUTE - INDEX
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+ '/public/cucm2.html'), {
    'title': 'CUCM 2.0'
  });
})

// EXPRESS ROUTING - INCLUDE - CUCM Mapper
var routingextensions = require(__dirname+ '/routes/cucmmapper.js')(app);

// APP
app.listen(3000, function () {
  console.log('CUCM 2.0 listening on port 3000!')
})