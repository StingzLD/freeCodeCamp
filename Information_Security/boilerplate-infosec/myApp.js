var express = require('express');
var app = express();

// Challenge: Install and Require Helmet
// Instructions: Install Helmet version 3.21.3, then require it.
const helmet = require('helmet')

// Challenge: Hide Potentially Dangerous Information Using helmet.hidePoweredBy()
// Instructions: Use the helmet.hidePoweredBy() middleware to remove the X-Powered-By header.
app.use(helmet.hidePoweredBy());

// Challenge: Mitigate the Risk of Clickjacking with helmet.frameguard()
// Instructions: Use helmet.frameguard() passing with the configuration object {action: 'deny'}.
app.use(
  helmet.frameguard({
    action: 'deny',
  })
);

// Challenge: Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()
// Instructions: Use helmet.xssFilter() to sanitize input sent to your server.
app.use(helmet.xssFilter());

// Challenge: Avoid Inferring the Response MIME Type with helmet.noSniff()
// Instructions: Use the helmet.noSniff() method on your server.
app.use(helmet.noSniff());

// Challenge: Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()
// Instructions: Use the helmet.ieNoOpen() method on your server.
app.use(helmet.ieNoOpen());

// Challenge: Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()
// Instructions: Configure helmet.hsts() to use HTTPS for the next 90 days. Pass the config object {maxAge: timeInSeconds, force: true}. You can create a variable ninetyDaysInSeconds = 90*24*60*60; to use for the timeInSeconds. 
var ninetyDaysInSeconds = 90*24*60*60
app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true,
  })
);

// Challenge: Disable DNS Prefetching with helmet.dnsPrefetchControl()
// Instructions: Use the helmet.dnsPrefetchControl() method on your server.
app.use(
  helmet.dnsPrefetchControl({
    allow: false,
  })
);

// Challenge: Disable Client-Side Caching with helmet.noCache()
// Instructions: Use the helmet.noCache() method on your server.
app.use(helmet.noCache());

// Challenge: Set a Content Security Policy with helmet.contentSecurityPolicy()
// Instructions: Use helmet.contentSecurityPolicy(). Configure it by adding a directives object. In the object, set the defaultSrc to ["'self'"] (the list of allowed sources must be in an array), in order to trust only your website address by default. Also set the scriptSrc directive so that you only allow scripts to be downloaded from your website ('self'), and from the domain 'trusted-cdn.com'.
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
    },
  })
);






module.exports = app;
var api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
