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
global.writerStack = [];
global.completeCounter = 0;

global.urlStack.push(config.target);

// Check if url.csv exists
if (fs.existsSync(config.csvFilename)) {
  // Exists, load urls
  require('csv-to-array')({
    file: config.csvFilename,
    columns: ['url']
  }, function(err, array) {
    // Push array data into completed stack
    array.forEach(function(obj, key) {
      if (key == array.length - 1) {
        // Push data into urlStack
        global.urlStack.push(obj.url);
      } else {
        // Push into completed
        global.completed.push(obj.url);
      }
    });
    // Continue scraping
    scraper(global.urlStack.shift(), function(err, url) {
      if (err) throw err;
      // URL complete, push to completed stack
      global.completed.push(url);
      // Start while loop controller
      // console.log('URL count: ' + global.urlStack.length);
      // Require auto controller
      var scraperController = require('./modules/scraperController');
      var writeController = require('./modules/writeController');
    });
  });
} else {
  // Make initial scrape request
  scraper(global.urlStack.shift(), function(err, url) {
    if (err) throw err;
    // URL complete, push to completed stack
    global.completed.push(url);
    // Start while loop controller
    // console.log('URL count: ' + global.urlStack.length);
    // Require auto controller
    var scraperController = require('./modules/scraperController');
    var writeController = require('./modules/writeController');
  });
}
