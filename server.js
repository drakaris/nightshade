/**********************
 * Mandatory requires *
 *********************/
var fs = require('fs');
var cheerio = require('cheerio');
var scraper = require('./modules/scraper');

/**********************
 * Configuration File *
 *********************/
var config = JSON.parse(fs.readFileSync('config.json'));

global.urlStack = [];
global.throttle = 0;
global.completed = [];

global.urlStack.push(config.target);

// Make initial scrape request
scraper(global.urlStack.shift(), function(err, url) {
  if (err) throw err;
  // URL complete, push to completed stack
  global.completed.push(url);
  // Start while loop controller
  console.log('URL count: ' + global.urlStack.length);
  // Require auto controller
  var controller = require('./modules/controller');
});
