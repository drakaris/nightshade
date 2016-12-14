var request = require('request');
var cheerio = require('cheerio');
var config = require('../config.json');

var scraper = function(target, callback) {
  var urlStack = [];
  request(target, function(error, response, body) {
    // Fetch target source code
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(body);
      $('a').map(function(i, link) {
        let href = $(link).attr('href');
        if (href.match(/http(s)?:\/\/(.)*(\.)?medium.com/g)) {
          urlStack.push(href);
        } else {
          console.log('[Rejected] ' + href);
        }
      });
      return callback(null, urlStack);
    } else {
      console.log('Something went wrong');
    }
  });
}

module.exports = scraper;
