const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const [hostname,port] = ['127.0.0.1', 3000];

// Setting Express-Liquid as View Engine
var expressLiquid = require('express-liquid');
var options = {
  // read file handler, optional
  includeFile: function (filename, callback) {
    fs.readFile(filename, 'utf8', callback);
  },
  // the base context, optional
  context: expressLiquid.newContext(),
  // custom tags parser, optional
  customTags: {},
  // if an error occurred while rendering, show detail or not, default to false
  traceError: true
};
app.set('view engine', 'liquid');
app.engine('liquid', expressLiquid(options));
app.use(expressLiquid.middleware);

// Set the Views Directory
app.set('views', './apphandlers/views');

// Pass data through to post handler
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

module.exports = {
  Start: function() {
    app.listen(port, hostname, function() {
        console.log(`Serving at ${hostname}:${port}`);
    })
  },
  App: app,
}
