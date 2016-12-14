var fs = require('fs');
var async = require('async');
var config = require('./config.json');
var scraper = require('./modules/scraper');

global.urlStack = [];
global.completed = [];
global.writerStack = [];

var completeCounter = 0;

// Define async queue globally
global.scraperQueue = async.queue(scraper, config.concurrency);

global.scraperQueue.drain = function() {
  if (completeCounter > 5) {
    // Exit
    process.exit();
  } else {
    completeCounter++;
  }
};

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
    var scraperController = require('./modules/scraperController');
    var writeController = require('./modules/writeController');
  });
} else {
  // Push root domain into urlStack
  global.urlStack.push(config.target);
  var scraperController = require('./modules/scraperController');
  var writeController = require('./modules/writeController');
}
