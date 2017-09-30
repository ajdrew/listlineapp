const express = require('express')
const app = express()


app.get('/', function (req, res) {
  res.send('Hello World!')
})

// EXPRESS ROUTING - INDEX
app.get('/', function(req, res) {
  res.render('listlineapp2.html', {
    layout: false,
    'title': 'CUCM 2.1'
  });
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})