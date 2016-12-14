/**********************
 * Mandatory requires *
 *********************/
var fs = require('fs');
var cheerio = require('cheerio');
var scraper = require('./modules/scraper');

/*********************
 * Configartion File *
 ********************/
var config = JSON.parse(fs.readFileSync('config.json'));

scraper(config.target, function(err, links) {
  if (err) throw err;
  console.log(links.length);
  // links.forEach(function(link, key) {
  //   console.log(key + ' => ' + link);
  // });
})
