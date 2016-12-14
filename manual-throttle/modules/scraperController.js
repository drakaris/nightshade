var scraper = require('./scraper');
var config = require('../config.json')

module.exports = setInterval(function() {
  if (global.urlStack.length > 0) {
    if (global.throttle < config.concurrency) {
      let targetUrl = global.urlStack.shift();
      if (targetUrl === undefined) {
        // URL undefined
      } else if (global.completed.indexOf(targetUrl) > -1) {
        console.log('Skipping: ' + targetUrl);
      } else {
        // Pass to scraper function
        scraper(targetUrl, function(err, url) {
          if (err) throw err;
          global.completed.push(url);
          global.writerStack.push(url);
          process.stdout.write(`Finished [${global.completed.length}/${global.completed.length+global.urlStack.length}]\r`);
        });
      }
    } else {
      // Max throttle
    }
  } else {
    // All URLs probably done
    if (global.completeCounter > 10) {
      // Exit
      process.exit();
    } else {
      global.completeCounter++;
    }
  }
}, 100);
