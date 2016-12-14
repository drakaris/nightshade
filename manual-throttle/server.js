/**********************
 * Mandatory requires *
 *********************/
var fs = require('fs');
var scraper = require('./modules/scraper');
var config = require('./config.json');

/********************
 * Global Variables *
 *******************/
global.urlStack = [];
global.throttle = 0;
global.completed = [];
global.writerStack = [];
global.completeCounter = 0;

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
      // Require controllers
      var scraperController = require('./modules/scraperController');
      var writeController = require('./modules/writeController');
    });
  });
} else {
  // Make initial scrape request
  global.urlStack.push(config.target);
  scraper(global.urlStack.shift(), function(err, url) {
    if (err) throw err;
    // URL complete, push to completed stack
    global.completed.push(url);
    // Require controllers
    var scraperController = require('./modules/scraperController');
    var writeController = require('./modules/writeController');
  });
}
