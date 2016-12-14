module.exports = setInterval(function() {
  if (global.urlStack.length > 0) {
    // Some URL exists, perform checks
    let targetUrl = global.urlStack.shift();
    if (global.completed.indexOf(targetUrl) > -1) {
      console.log('Skipping: ' + targetUrl);
    } else {
      global.scraperQueue.push(targetUrl, function(err, url) {
        if (err) throw err;
        global.completed.push(url);
        global.writerStack.push(url);
        process.stdout.write(`Finished [${global.completed.length}/${global.completed.length+global.urlStack.length}]\r`);
      })
    }
  }
}, 750);
