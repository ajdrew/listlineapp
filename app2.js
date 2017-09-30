const express = require('express')
const app = express()
const path = require("path")

// set static directories
app.use(express.static(path.join(__dirname, 'public')));

// EXPRESS ROUTE - /
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+ '/public/listlineapp2.html'), {
    'title': 'CUCM 2.1'
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})