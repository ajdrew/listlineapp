module.exports = function (app) {
  // FORM - SUBMIT - CUCMMAPPER
  app.post('/cucmmapper/submit', function (req, res) {

    // FORM - DATA COLLECTION
    var cucmpub = req.body.cucmpub;
    var cucmversion = req.body.cucmversion;
    var username = req.body.username;
    var password = req.body.password;

    // JS - VARIABLE DEFINITION
    var authentication = username + ":" + password;
    var soapreplyx = '';
    var csssearchx = '';
    //var parser = new xml2js.parser();

    // HTTP.REQUEST - BUILD CALL
    var https = require("https");
    var headers = {
      'SoapAction': 'CUCM:DB ver=' + cucmversion + ' listCss',
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

    // HTTP.REQUEST - OPTIONS
    var options = {
      host: cucmpub, // IP ADDRESS OF CUCM PUBLISHER
      port: 8443, // DEFAULT CISCO SSL PORT
      path: '/axl/', // AXL URL
      method: 'POST', // AXL REQUIREMENT OF POST
      headers: headers, // HEADER VAR
      rejectUnauthorized: false // REQUIRED TO ACCEPT SELF-SIGNED CERTS
    };

    // HTTP.REQUEST - Doesn't seem to need this line, but it might be useful anyway for pooling?
    options.agent = new https.Agent(options);

    // SOAP - OPEN SESSION
    var req = https.request(options, function (res) {
      res.setEncoding('utf8');
      res.on('data', function (d) {
        console.log("Got Data ...");
        //soapreplyx = d;
        //console.log("Got Data: " + d);
      });
    });

    // HTTP.REQUEST - RUN
    let soapRequest = https.request(options, soapResponse => {
      soapResponse.setEncoding('utf8');
      soapResponse.on('data', chunk => {
        soapreplyx += chunk
      });
      // HTTP.REQUEST - RESULTS + RENDER
      soapResponse.on('end', () => {
        // parser.parseString(soapreplyx, function(err, result) {
        //   csssearchx = result['name']
        //   console.log(csssearchx);
        // })
        // var csssearchx = $(soapreplyx).find("name").text();
        return res.render('cucmmapper-results.html', {
          title: 'CUCM 2.1',
          soapreply: soapreplyx,
          csssearch: csssearchx
        });
      });
    });

    // SOAP - SEND AXL CALL
    soapRequest.write(soapBody);
    soapRequest.end();
    req.on('error', function (e) {
      console.error(e);
    });
  });
}