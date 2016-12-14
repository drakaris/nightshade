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

// Push root domain into urlStack
global.urlStack.push(config.target);

var scraperController = require('./modules/scraperController');
