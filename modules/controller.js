var scraper = require('./scraper');
var config = require('../config.json')

module.exports = setInterval(function() {
  if (global.throttle < config.concurrency) {
    let targetUrl = global.urlStack.shift();
    if (targetUrl === undefined) {
      // console.log('Undefined');
    } else if (global.completed.indexOf(targetUrl) > -1) {
      console.log('Skipping: ' + targetUrl);
    } else {
      // Pass to scraper function
      scraper(targetUrl, function(err, url) {
        if (err) throw err;
        global.completed.push(url);
        process.stdout.write(`Finished [${global.completed.length}/${global.completed.length+global.urlStack.length}]\r`);
      });
    }
  } else {
    // console.log('Throttle full');
  }
}, 100);
