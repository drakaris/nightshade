var request = require('request');
var cheerio = require('cheerio');
var config = require('../config.json');

var scraper = function(target, callback) {
  // Increase throttle count
  global.throttle++;
  // Fetch target source code
  request(target, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // Medium request done, reduce throttle count
      global.throttle--;
      let $ = cheerio.load(body);
      $('a').map(function(i, link) {
        let href = $(link).attr('href');
        if (href.match(/http(s)?:\/\/(.)*(\.)?medium\.com/g) && global.completed.indexOf(href) == -1 && global.urlStack.indexOf(href) == -1) {
          global.urlStack.push(href);
        } else {
          // URL rejected
        }
      });
      // Send back completed url
      return callback(null, target);
    } else {
      // Reduce throttle count, request over.
      global.throttle--;
      return callback(error);
    }
  });
}

module.exports = scraper;
