# nightshade
Populates a CSV file with all URLs from a given target.

## Installing Dependancies
Navigate into the `manual-throttle` folder and locate `package.json`.

From terminal run: `npm install`

## Getting Started
Navigate into the `async-lib-throttle` folder and find `server.js`.

To start the scraper, from terminal, run: `node server.js`

## How It Works
The `async-lib-throttle` version uses `async.js` package, in particular `async.queue()` which takes an additional parameter that determines concurrency. `config.concurrency` is directly used here.

`global.urlStack`, `global.completed` and `global.writerStack` hold URLs through different phases of the operation.

The `async-lib-throttle` version has the ability to continue scraping from the most recent URL in the CSV output file. The scraper only needs to be `restarted` to resume scraping.

## Default Settings
The `config.json` file contains **default** control variables for the scraper as follows.
```
{
  "target": "https://medium.com",
  "concurrency": 5,
  "csvFilename": "url.csv"
}
```
`target` holds the root domain URL that the scraper visits.

`concurrency` holds the number of concurrent requests that can occur at any given time during the scraping.

`csvFilename` holds the name of the output CSV file that holds scraped URLs.

## Live Monitoring
To monitor the URLs being scraped in real-time, **after** starting the scraper, run :
`tail -f url.csv`

**Note:** Please make sure the `filename` used in `tail -f <filename>` matches the `csvFilename` attribute in `config.json`

## Author
This module has been written by Arjhun Srinivas, available at arjhun.s[at]gmail.com, please feel free to ping me.
