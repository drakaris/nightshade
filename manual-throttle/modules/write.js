var fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter({
  headers: ['url']
});
var config = require('../config.json');
writer.pipe(fs.createWriteStream(process.cwd() + '/' + config.csvFilename));
var csvWriter = function(url) {
  let data = {
    url: url
  };
  writer.write(data);
}

module.exports = csvWriter;
