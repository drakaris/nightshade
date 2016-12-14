var scraper = require('./scraper');
var config = require('../config.json')

module.exports = setInterval(function() {
  if (global.throttle < config.concurrency) {
    let targetUrl = global.urlStack.shift();
    if (targetUrl === undefined) {
      console.log('Undefined');
    } else if (global.completed.indexOf(targetUrl) > -1) {
      console.log('Skipping: ' + targetUrl);
    } else {
      // Pass to scraper function
      scraper(targetUrl, function(err, url) {
        if (err) throw err;
        global.completed.push(url);
        console.log('URL count: ' + global.urlStack.length);
      });
    }
  } else {
    // console.log('Throttle full');
    console.log('Finished: ' + global.completed.length);
  }
}, 300);
