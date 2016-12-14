var csvWriter = require('./write');

module.exports = setInterval(function() {
  // Empty writerStack into CSV file
  if (global.writerStack.length > 0) {
    // URLs exist, write to CSV file
    let url = global.writerStack.shift();
    csvWriter(url);
  }
});
