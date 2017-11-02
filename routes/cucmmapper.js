// MODULES - INCLUDES
var transform = require('camaro');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

// TEST DATA
const xmloriginal = `
  <?xml version='1.0' encoding='utf-8'?>
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
      <soapenv:Body>
          <ns:listCssResponse xmlns:ns="http://www.cisco.com/AXL/API/11.5">
              <return>
                  <css uuid="{CA14384C-D04D-39D0-2BAF-01EEDD8E9914}">
                      <description/>
                      <clause>AllPhones</clause>
                      <name>SUBSCRIBE</name>
                  </css>
                  <css uuid="{97FE9A56-85D7-8198-805C-925E2FB264DD}">
                      <description>CSS for Unity Connection SIP Trunk</description>
                      <clause>AllPhones:Unity_Connection:UCCX</clause>
                      <name>CSS-Unity</name>
                  </css>
                  <css uuid="{1D61F1AD-8E1C-DC71-C9AD-E37B85DE0F9C}">
                      <description>Internal Only</description>
                      <clause>AllPhones:Unity_Connection:Agents:UCCX</clause>
                      <name>CSS-Internal</name>
                  </css>
                  <css uuid="{C09EDFA7-4BF7-AF15-483D-54F0D07666A1}">
                      <description>Inbound CSS for Gateways</description>
                      <clause>AllPhones:Unity_Connection:UCCX</clause>
                      <name>CSS-Gateways</name>
                  </css>
                  <css uuid="{A2BF1C5E-6685-D33A-D8BB-037F4D211DC9}">
                      <description>Local, Internal, and Emergency</description>
                      <clause>AllPhones:Unity_Connection:LAB-PSTN-Sim-911:LAB-PSTN-Sim-Local:Agents:UCCX</clause>
                      <name>CSS-PSTN-Sim-Local</name>
                  </css>
                  <css uuid="{DF03B400-DA2D-29A7-6460-D0B72D578CD7}">
                      <description>LD, Local, Internal, and Emergency</description>
                      <clause>AllPhones:Unity_Connection:LAB-PSTN-Sim-911:LAB-PSTN-Sim-Local:LAB-PSTN-Sim-LD:Blocked:Agents:UCCX</clause>
                      <name>CSS-PSTN-Sim-LD</name>
                  </css>
                  <css uuid="{F4626B2A-E3F6-6BF0-78E7-CBB6123091CB}">
                      <description>Intl, LD, Local, Internal, and Emergency</description>
                      <clause>AllPhones:Unity_Connection:Blocked:LAB-PSTN-Sim-911:LAB-PSTN-Sim-Local:LAB-PSTN-Sim-LD:LAB-PSTN-Sim-Intl:Agents:UCCX</clause>
                      <name>CSS-PSTN-Sim-Intl</name>
                  </css>
                  <css uuid="{70E8D03E-623E-354C-991D-9FB392747291}">
                      <description>Inbound Transform Calling</description>
                      <clause>LAB-Tansform-Calling</clause>
                      <name>CSS-LAB-Transform-Calling</name>
                  </css>
                  <css uuid="{5FD922AD-9A14-FD17-ACBF-8FAAF2B7326F}">
                      <description>CSS for UCCX Port Group</description>
                      <clause>AllPhones:Agents:Unity_Connection:UCCX</clause>
                      <name>CSS-UCCX</name>
                  </css>
              </return>
          </ns:listCssResponse>
      </soapenv:Body>
  </soapenv:Envelope>
  `;

const xmlworking = `
  <?xml version='1.0' encoding='utf-8'?>
              <return>
                  <css>
                      <description/>
                      <clause>AllPhones</clause>
                      <name>SUBSCRIBE</name>
                  </css>
                  <css>
                      <description>CSS for Unity Connection SIP Trunk</description>
                      <clause>AllPhones:Unity_Connection:UCCX</clause>
                      <name>CSS-Unity</name>
                  </css>
                  <css>
                      <description>Internal Only</description>
                      <clause>AllPhones:Unity_Connection:Agents:UCCX</clause>
                      <name>CSS-Internal</name>
                  </css>
                  <css>
                      <description>Inbound CSS for Gateways</description>
                      <clause>AllPhones:Unity_Connection:UCCX</clause>
                      <name>CSS-Gateways</name>
                  </css>
                  <css>
                      <description>Local, Internal, and Emergency</description>
                      <clause>AllPhones:Unity_Connection:LAB-PSTN-Sim-911:LAB-PSTN-Sim-Local:Agents:UCCX</clause>
                      <name>CSS-PSTN-Sim-Local</name>
                  </css>
                  <css>
                      <description>LD, Local, Internal, and Emergency</description>
                      <clause>AllPhones:Unity_Connection:LAB-PSTN-Sim-911:LAB-PSTN-Sim-Local:LAB-PSTN-Sim-LD:Blocked:Agents:UCCX</clause>
                      <name>CSS-PSTN-Sim-LD</name>
                  </css>
                  <css>
                      <description>Intl, LD, Local, Internal, and Emergency</description>
                      <clause>AllPhones:Unity_Connection:Blocked:LAB-PSTN-Sim-911:LAB-PSTN-Sim-Local:LAB-PSTN-Sim-LD:LAB-PSTN-Sim-Intl:Agents:UCCX</clause>
                      <name>CSS-PSTN-Sim-Intl</name>
                  </css>
                  <css>
                      <description>Inbound Transform Calling</description>
                      <clause>LAB-Tansform-Calling</clause>
                      <name>CSS-LAB-Transform-Calling</name>
                  </css>
                  <css>
                      <description>CSS for UCCX Port Group</description>
                      <clause>AllPhones:Agents:Unity_Connection:UCCX</clause>
                      <name>CSS-UCCX</name>
                  </css>
              </return>
  `;
  const xml3 = `
              <return>
                  <css uuid="{CA14384C-D04D-39D0-2BAF-01EEDD8E9914}">
                      <description/>
                      <clause>AllPhones</clause>
                      <name>SUBSCRIBE</name>
                  </css>
                  <css uuid="{97FE9A56-85D7-8198-805C-925E2FB264DD}">
                      <description>CSS for Unity Connection SIP Trunk</description>
                      <clause>AllPhones:Unity_Connection:UCCX</clause>
                      <name>CSS-Unity</name>
                  </css>
                  <css uuid="{1D61F1AD-8E1C-DC71-C9AD-E37B85DE0F9C}">
                      <description>Internal Only</description>
                      <clause>AllPhones:Unity_Connection:Agents:UCCX</clause>
                      <name>CSS-Internal</name>
                  </css>
                  <css uuid="{C09EDFA7-4BF7-AF15-483D-54F0D07666A1}">
                      <description>Inbound CSS for Gateways</description>
                      <clause>AllPhones:Unity_Connection:UCCX</clause>
                      <name>CSS-Gateways</name>
                  </css>
                  <css uuid="{A2BF1C5E-6685-D33A-D8BB-037F4D211DC9}">
                      <description>Local, Internal, and Emergency</description>
                      <clause>AllPhones:Unity_Connection:LAB-PSTN-Sim-911:LAB-PSTN-Sim-Local:Agents:UCCX</clause>
                      <name>CSS-PSTN-Sim-Local</name>
                  </css>
                  <css uuid="{DF03B400-DA2D-29A7-6460-D0B72D578CD7}">
                      <description>LD, Local, Internal, and Emergency</description>
                      <clause>AllPhones:Unity_Connection:LAB-PSTN-Sim-911:LAB-PSTN-Sim-Local:LAB-PSTN-Sim-LD:Blocked:Agents:UCCX</clause>
                      <name>CSS-PSTN-Sim-LD</name>
                  </css>
                  <css uuid="{F4626B2A-E3F6-6BF0-78E7-CBB6123091CB}">
                      <description>Intl, LD, Local, Internal, and Emergency</description>
                      <clause>AllPhones:Unity_Connection:Blocked:LAB-PSTN-Sim-911:LAB-PSTN-Sim-Local:LAB-PSTN-Sim-LD:LAB-PSTN-Sim-Intl:Agents:UCCX</clause>
                      <name>CSS-PSTN-Sim-Intl</name>
                  </css>
                  <css uuid="{70E8D03E-623E-354C-991D-9FB392747291}">
                      <description>Inbound Transform Calling</description>
                      <clause>LAB-Tansform-Calling</clause>
                      <name>CSS-LAB-Transform-Calling</name>
                  </css>
                  <css uuid="{5FD922AD-9A14-FD17-ACBF-8FAAF2B7326F}">
                      <description>CSS for UCCX Port Group</description>
                      <clause>AllPhones:Agents:Unity_Connection:UCCX</clause>
                      <name>CSS-UCCX</name>
                  </css>
              </return>
  `;

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
    var spacer = '-----';
    var myedit = '';
    var regexline1 = "/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g";
    var line1 = '';
    var line2 = '';
    var line3 = '';
    var line4 = '';
    var lineend1 = '';
    var lineend2 = '';
    var lineend3 = '';

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
        
        // CAMARO - CODE FOR JSON
        // const { css } = transform(xml, {
        //   css: ['//css', {
        //       cssname: 'name',
        //       cssdescription: 'description',
        //       csspartitions: 'clause'
        //   }]
        // });
        // console.log(css)
        // res.render('cucmmapper-results.html', {
        //   title: 'CUCM 2.1',
        //   soapreply: soapreplyx,
        //   cucmpub: cucmpub,
        //   css: css
        // });

        // EDIT - SCRUB TEST XML - WORKING
        // var line1 = xmloriginal.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
        // var line2 = line1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
        // var line3 = line2.replace(/<soapenv:Body>/g, '');
        // var line4 = line3.replace(/<ns:listCssResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
        // // console.log(line4);
        // // console.log(spacer);
        // var lineend1 = line4.replace(/<\/soapenv:Envelope>/g, '');
        // var lineend2 = lineend1.replace(/<\/soapenv:Body>/g, '');
        // var lineend3 = lineend2.replace(/<\/ns:listCssResponse>/g, '');
        // console.log(lineend3);
        // console.log(spacer);

        // EDIT - SCRUB XML OUTPUT
        var line1 = soapreplyx.replace(/<\?xml\sversion='1\.0'\sencoding='utf-8'\?>/g, '');
        var line2 = line1.replace(/<soapenv:Envelope\sxmlns:soapenv="http:\/\/schemas.xmlsoap.org\/soap\/envelope\/">/g, '');
        var line3 = line2.replace(/<soapenv:Body>/g, '');
        var line4 = line3.replace(/<ns:listCssResponse\sxmlns:ns="http:\/\/www\.cisco\.com\/AXL\/API\/[0-9]*\.[0-9]">/g, '');
        // console.log(line4);
        // console.log(spacer);
        var lineend1 = line4.replace(/<\/soapenv:Envelope>/g, '');
        var lineend2 = lineend1.replace(/<\/soapenv:Body>/g, '');
        var lineend3 = lineend2.replace(/<\/ns:listCssResponse>/g, '');
        console.log(lineend3);
        console.log(spacer);



        // XML2JS - TESTING
        parser.parseString(lineend3, function (err, result) {
          var cssx = result['return']['css'];
          console.log(cssx);
          console.log(spacer);
          res.render('cucmmapper-results.html', {
            title: 'CUCM 2.1',
            soapreply: soapreplyx,
            cucmpub: cucmpub,
            cssx: cssx,
            lineend3: lineend3
          });
        });

        // XML2JS - 1ST WORKING CODE !!!
        // parser.parseString(xmlworking, function (err, result) {
        //   var cssx = result['return']['css'];
        //   console.log(cssx);
        //   console.log(spacer);
        //   res.render('cucmmapper-results.html', {
        //     title: 'CUCM 2.1',
        //     soapreply: soapreplyx,
        //     cucmpub: cucmpub,
        //     cssx: cssx
        //   });
        // });
      });
    });

    // SOAP - SEND AXL CALL
    soapRequest.write(soapBody);
    soapRequest.end();
  });
}