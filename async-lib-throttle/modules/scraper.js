var request = require('request');
var cheerio = require('cheerio');

var scraper = function(target, callback) {
  // Fetch target source code
  request(target, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      let $ = cheerio.load(body);
      $('a').map(function(i, link) {
        let href = $(link).attr('href');
        if (href.match(/http(s)?:\/\/(.)*(\.)?medium\.com/g) && global.completed.indexOf(href) == -1 && global.urlStack.indexOf(href) == -1) {
          global.urlStack.push(href);
        } else {
          // console.log('[Rejected] ' + href);
        }
      });
      // Send back completed url
      return callback(null, target);
    } else {
      return callback(error);
    }
  });
}

module.exports = scrapers;
