module.exports = function (app) {
  // FORM - SUBMIT - CUCMMAPPER
  app.post('/cucmmapper/submit', function (req, res) {
    console.log(req.body);
    // FORM - DATA COLLECTION
    var cucmpub = req.body.cucmpub;
    //var username = req.body.username;
    //var password = req.body.password;



    // SOAP - BUILD CALL
    var https = require("https");

    var authentication = 'user:password';

    var headers = {
      'SoapAction': 'CUCM:DB ver=11.5 listCss',
      'Authorization': 'Basic ' + new Buffer(authentication).toString('base64'),
      'Content-Type': 'text/xml; charset=utf-8'
    };

    // SOAP - AXL CALL
    var soapBody = new Buffer('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://www.cisco.com/AXL/API/11.5">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<ns:listCss sequence="?">' +
      '<searchCriteria>' +
      '<name>%</name>' +
      '</searchCriteria>' +
      '<returnedTags uuid="?">' +
      '<name>?</name>' +
      '<description>?</description>' +
      '<clause>?</clause>' +
      '</returnedTags>' +
      '</ns:listCss>' +
      '</soapenv:Body>' +
      '</soapenv:Envelope>');

    // SOAP - OPTIONS
    var options = {
      host: '192.168.204.10', // The IP Address of the Communications Manager Server
      port: 8443, // Clearly port 443 for SSL -- I think it's the default so could be removed
      path: '/axl/', // This is the URL for accessing axl on the server
      method: 'POST', // AXL Requires POST messages
      headers: headers, // using the headers we specified earlier
      rejectUnauthorized: false // required to accept self-signed certificate
    };

    // SOAP - Doesn't seem to need this line, but it might be useful anyway for pooling?
    options.agent = new https.Agent(options);

    // SOAP - OPEN SESSION
    var req = https.request(options, function (res) {
      console.log("status code = ", res.statusCode);
      console.log("headers = ", res.headers);
      res.setEncoding('utf8');
      res.on('data', function (d) {
        console.log("Got Data: " + d);
      });
    });

    // SOAP - SEND AXL CALL
    req.write(soapBody);
    req.end();
    req.on('error', function (e) {
      console.error(e);
    });

    // SOAP - INVISIBLE REDIRECT TO INFORMATION
    res.redirect('/cucmmapper-results');
  });
}