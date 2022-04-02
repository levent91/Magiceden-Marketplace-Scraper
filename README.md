# Magiceden Marketplace Scraper

This actor takes a collection input and scrapes the data from Magiceden API.

### Input

#### startUrls <Array>
The Array of collection urls that you want to scrape.

The format should be as following:

https://magiceden.io/marketplace/boryoku_dragonz

### SendRaw <boolean> 
If set true, gets the raw API response from Magiceden's API, if it's set to false the output is simpler & cleaner.

Default value = false

### getOnlySales <boolean>

Getting listings require several more requests depending on the size of the collection/listed items. You can skip those if you only want sales and basic collection data.

Default value = false

### maxConcurrency <Number>

Amount of maximum parallel requests for the run. Decrease to get blocked less.

Default value = 10

### proxy <Object>

Proxy configurations for the actor, you can customize it if you want to.

Default value = { useApifyProxy: true }

