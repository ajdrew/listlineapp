// MODULES - INCLUDES
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var transform = require('camaro');

// TEMPLATE - XML CAMARO FILTER
const template = {
  css: ['///return', {
    css_name: 'name',
    css_partitions: 'clause',
  }],
};
const template2 = {
  css_name: '/soapenv:Envelope/soapenv:Body/ns:listCssResponse/return/css/name',
  css_partitions: '/soapenv:Envelope/soapenv:Body/ns:listCssResponse/return/css/clause',
};
const template3 = {
  css: ['/soapenv:Envelope/soapenv:Body/ns:listCssResponse/return/css', {
    css_name: 'name',
    css_partitions: 'clause'
  }]
};

// TEMP - XMLFORMAT TEST
const xml = (`<?xml version='1.0' encoding='utf-8'?>` +
  `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">` +
  '<soapenv:Body>' +
  '<ns:listCssResponse xmlns:ns="http://www.cisco.com/AXL/API/11.0">' +
  '<return>' +
  '<css uuid="{E85C54E1-5737-7516-FFFC-14E97B1D0504}">' +
  '<description>description1</description>' +
  '<clause>something1</clause>' +
  '<name>name1</name>' +
  '</css>' +
  '<css uuid="{AFFC55A7-CD16-E250-09E8-9A12ABBE0C9E}">' +
  '<description>description2</description>' +
  '<clause>something2</clause>' +
  '<name>name2</name>' +
  '</css>' +
  '</return>' +
  '</ns:listCssResponse>' +
  '</soapenv:Body>' +
  '</soapenv:Envelope>');

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
    var cssx = '';

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

    // HTTP.REQUEST - OPEN SESSION
    let soapRequest = https.request(options, soapResponse => {
      soapResponse.setEncoding('utf8');
      soapResponse.on('data', chunk => {
        soapreplyx += chunk
      });
      // HTTP.REQUEST - RESULTS + RENDER
      soapResponse.on('end', () => {
        const result = transform(soapreplyx, template2);
        console.log(result);
        // parser.parseString(soapreplyx, function (err, result) {
        //   console.dir(result);
        //   var cssx = result['soapenv:Envelope']['soapenv:Body']['ns:listCssResponse']['return']['css']['name'];
        //   console.log(cssx);
        res.render('cucmmapper-results.html', {
          title: 'CUCM 2.1',
          soapreply: soapreplyx,
          css: result,
        });
      });
    });

    // SOAP - SEND AXL CALL
    soapRequest.write(soapBody);
    soapRequest.end();
  });
}