# Magic Eden Marketplace Scraper

This actor takes a collection input and scrapes the data from Magic Eden API (Solana Network NFT Marketplace). There are mainly 2 types of results, raw and beautified. The beautified (default) one just beautifies the outputs from the raw source and adds some information such as "Unique Buyer Percentage" etc, whereas raw results just outputs the raw information from the Magic Eden API

| Field | Type | Description | Default value
| ----- | ---- | ----------- | -------------|
| startUrls | array | List of Collections to be searched | none |
| sendRaw | boolean | If set to true, gets the raw data from Magic Eden's API | false |
| getOnlySales | boolean | Gets only basic collection information and available sales data, does not include listings | false |
| maxConcurrency | number | Sets the maximum amount of parallel requests | 10 |
| proxyConfiguration | object | Proxy settings of the run. If you have access to Apify proxy, leave the default settings. If not, you can set `{ "useApifyProxy": false" }` to disable proxy usage | `{ "useApifyProxy": true }`|

The `startUrls` atrribute has to be set in order to run the scraper.

### Non Raw Output

- The beautified output has three parts, basicInformation, salesInformation and listingsInformation. listingsInformation can be disabled but basicInformation and salesInformation will always be displayed.
- The Raw currency output is in [Lamports](https://docs.solana.com/terminology#lamport) which is normalized in beautified output.
- There are some small calculations to analyze data, e.g unique buyers, unique sellers.
- The sales data only gets the available information in the Magic Eden API which doesn't carry historical sales data.

A sample beautified data looks as below:


```jsonc
[{
	"basicInformation": {
		"symbol": "boryoku_dragonz",
		"floorPrice": 240,
		"listedCount": 16,
		"listedTotalValue": 9679.38,
		"avgPrice24hr": 229.5,
		"volume24hr": 459,
		"volumeAll": 121408.31917684
	},
	"salesInformation": {
		"fetchedSales": 23,
		"averagePrice": 241.95652173913044,
		"uniqueBuyers": 19,
		"uniqueBuyerPercentage": 82.61,
		"theMostFrequentBuyer": "CGBgUkHm8GNPgFNVaKPUMkFsnGm3kapkkJEcJEao9TG5",
		"theMostFrequentBuyerBuyCount": 3,
		"uniqueSellers": 21,
		"uniqueSellersPercentage": 91.3,
		"theMostFrequentSeller": "CGBgUkHm8GNPgFNVaKPUMkFsnGm3kapkkJEcJEao9TG5",
		"theMostFrequentSellerSellCount": 2,
		"sales": [{
				"transactionId": "2pkCytrmxLLsa5AAjmqZMbUGEkWbfVeuntGAqPpQfg2pX5HZTwAW6uy27UMjqYGvK857r1hqAd6MzGETosgRPfki",
				"txTime": "2022-04-04T05:32:11.903Z",
				"mint": "FbmavUBhibTakoSbYhSCqBnTWApTnC2oZN84UJDxLTEh",
				"sellerAddress": "HiEAyem8BN95qqWoDgNyDfz4t3CxCZTLB9jHBU14j7Ve",
				"buyerAddress": "5s1Ymy2PfcR4C8eKDWJASznMVaJZECa6DeKKrL27HWhL",
				"amount": 210,
				"img": "https://arweave.net/g-C5xLPzKTGqZX7f8pghO9k9W6IK35tLiVeSf9bkJ8M?ext=png",
				"title": "Boryoku Dragonz #925",
				"source": "magiceden_v2"
			},
			{
				"transactionId": "2nL5qdbtQs6PEpzyBFcC7CWNUCzx4Puxc7gCwjTL1sj9VaZ5Dn55hCJ3hgP5uMTSFrHT25KBoTtPgfuDdeKa4vr",
				"txTime": "2022-04-04T01:00:56.932Z",
				"mint": "3cef7QiRBME2kvH8zhGRiR6sfShnoxdrna8CHg4TcyLc",
				"sellerAddress": "YJLcz6UayFQ64xyc6xsmEvFPRVPeJsVJjTByjMKoEJk",
				"buyerAddress": "4ZLciFNgcWZQg8W4ehfUr1ejcY1td7NwWNENMBs8zP4Y",
				"amount": 249,
				"img": "https://arweave.net/1v0Yf4nXvfSMLjllaGr5hkoK6llXawdsJHlANEwESz8?ext=png",
				"title": "Boryoku Dragonz #863",
				"source": "magiceden_v2"
			}
		]
	},
	"listingsInformation": {
		"totalListed": 16,
		"uniqueListers": 16,
		"uniqueListersPercentage": 100,
		"mostFrequentLister": "2E65eUa1RzvtGZViR2ouStmdEF71WSw8eM3J3UavsSg3",
		"theMostFrequentListerListCount": 1,
		"lists": [{
				"id": "fTen4jLSATFM1z5H3y4bUKYgo9p1mqWoGWKPeuGRgxf",
				"mintAddress": "8TeRL94UTYDRtyE2JJSb7h7KGwUJLFvsNne4c5qAHyUa",
				"owner": "BNedxPqVzNAYDfJsdCeMqegTGTTG4qbjci9WkwsXBGsx",
				"price": 240,
				"title": "Boryoku Dragonz #425",
				"image": "https://arweave.net/5Rm_6QL2fVM5erLf4zz4ZJ-HKnIWCh8LymHgQSpgYu8?ext=png",
				"rarity": null
			},
			{
				"id": "Hv2K7p9vgDkSghTyw8ytyPX4poNqBYJ9cBgKzjZ9PxK9",
				"mintAddress": "8WiiQUF2MiETWRREb9G1eC63MQW1mAhoGkrBkTFX8XiC",
				"owner": "ESeEb7zaep7zg5woEjPXw82qTZJvpkzSkBCFf7n3RboA",
				"price": 250,
				"title": "Boryoku Dragonz #553",
				"image": "https://arweave.net/bcc6GF8Z5nte4Sn3xrU2bI4ngTwTl84ZY0SgGsLHPXs?ext=png",
				"rarity": 360
			}
		]
	}
}]

```

### Raw Output

The Raw output looks as following

```jsonc

[{
	"basicInformation": {
		"symbol": "boryoku_dragonz",
		"enabledAttributesFilters": true,
		"availableAttributes": [{
				"count": 6,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Yellow"
				}
			},
			{
				"count": 2,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Grey"
				}
			},
			{
				"count": 1,
				"floor": 260000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Pink"
				}
			},
			{
				"count": 1,
				"floor": 300000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Japanese"
				}
			},
			{
				"count": 1,
				"floor": 332000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Beige"
				}
			},
			{
				"count": 1,
				"floor": 345000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Lavender"
				}
			},
			{
				"count": 2,
				"floor": 370000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Green"
				}
			},
			{
				"count": 1,
				"floor": 499690000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Tron"
				}
			},
			{
				"count": 2,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Synthwave Shades"
				}
			},
			{
				"count": 3,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Laughing Goggles"
				}
			},
			{
				"count": 1,
				"floor": 265000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Red Eyes"
				}
			},
			{
				"count": 1,
				"floor": 275000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Classic Eyes"
				}
			},
			{
				"count": 1,
				"floor": 285000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Blue Eyes"
				}
			},
			{
				"count": 2,
				"floor": 300000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "3D Glasses"
				}
			},
			{
				"count": 1,
				"floor": 332000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Vipers"
				}
			},
			{
				"count": 1,
				"floor": 345000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Tracker"
				}
			},
			{
				"count": 3,
				"floor": 370000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Golden Shades"
				}
			},
			{
				"count": 16,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Generation",
					"value": "Genesis"
				}
			},
			{
				"count": 2,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Head",
					"value": "Fireball"
				}
			},
			{
				"count": 10,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Head",
					"value": "None"
				}
			},
			{
				"count": 1,
				"floor": 345000000000,
				"attribute": {
					"trait_type": "Head",
					"value": "Croc"
				}
			},
			{
				"count": 1,
				"floor": 435000000000,
				"attribute": {
					"trait_type": "Head",
					"value": "Eye"
				}
			},
			{
				"count": 1,
				"floor": 499690000000,
				"attribute": {
					"trait_type": "Head",
					"value": "Slug"
				}
			},
			{
				"count": 1,
				"floor": 4200000000000,
				"attribute": {
					"trait_type": "Legendary",
					"value": "The Astro"
				}
			},
			{
				"count": 6,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "None"
				}
			},
			{
				"count": 3,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "Bubble Gum"
				}
			},
			{
				"count": 3,
				"floor": 270000000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "Pacifier"
				}
			},
			{
				"count": 1,
				"floor": 275000000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "Flame"
				}
			},
			{
				"count": 1,
				"floor": 285000000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "Ice Breath"
				}
			},
			{
				"count": 1,
				"floor": 370000000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "Rainbow Puke"
				}
			},
			{
				"count": 1,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Neck",
					"value": "Silver Chain"
				}
			},
			{
				"count": 7,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Neck",
					"value": "None"
				}
			},
			{
				"count": 5,
				"floor": 260000000000,
				"attribute": {
					"trait_type": "Neck",
					"value": "Golden Chain"
				}
			},
			{
				"count": 1,
				"floor": 285000000000,
				"attribute": {
					"trait_type": "Neck",
					"value": "Collar"
				}
			},
			{
				"count": 1,
				"floor": 370000000000,
				"attribute": {
					"trait_type": "Neck",
					"value": "Diamond Chain"
				}
			},
			{
				"count": 1,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Diamond Purple"
				}
			},
			{
				"count": 1,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Neon Orange"
				}
			},
			{
				"count": 1,
				"floor": 260000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Diamond Orange"
				}
			},
			{
				"count": 2,
				"floor": 265000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Cyber Grey"
				}
			},
			{
				"count": 2,
				"floor": 270000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Iron Yellow"
				}
			},
			{
				"count": 1,
				"floor": 285000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Zombie Golden"
				}
			},
			{
				"count": 1,
				"floor": 300000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Cosmic Green"
				}
			},
			{
				"count": 1,
				"floor": 332000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Zombie Blue"
				}
			},
			{
				"count": 1,
				"floor": 345000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Neon Blue"
				}
			},
			{
				"count": 2,
				"floor": 370000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Skeleton Golden"
				}
			},
			{
				"count": 1,
				"floor": 499690000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Cyber Blue"
				}
			},
			{
				"count": 1,
				"floor": 500000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Cyber Black"
				}
			}
		],
		"floorPrice": 250000000000,
		"listedCount": 16,
		"listedTotalValue": 9252380000000,
		"avgPrice24hr": 260781666666.66666,
		"volume24hr": 1564690000000,
		"volumeAll": 123208009176840
	},
	"salesInformation": {
		"results": [{
				"_id": "624ca16cbea360023d4ab06c",
				"transaction_id": "5xEpY1ekRjym6WMAteTVzVKHqtm645f1uTdFGP3wEHWgzBJ5uk9nc9Ns4hE3AR1fWvNvexcohAGBsUq2sZk1qfBA",
				"txType": "placeBid",
				"blockTime": 1649189212,
				"buyer_address": "BakZMixrKdJgZn9dx1fe5GK1EbToVP7yyrBp4tYtjZJ",
				"collection_symbol": "boryoku_dragonz",
				"createdAt": "2022-04-05T20:07:08.504Z",
				"mint": "62xNb1N5xjU3ANrf79jv9RGjmMQ84ozaPSWUFXnDC7Lx",
				"notifiable": true,
				"onChainCollectionAddress": null,
				"parsedPlacebid": {
					"TxType": "placeBid",
					"buyer_address": "BakZMixrKdJgZn9dx1fe5GK1EbToVP7yyrBp4tYtjZJ",
					"token_address": "62xNb1N5xjU3ANrf79jv9RGjmMQ84ozaPSWUFXnDC7Lx",
					"amount": 200000000000,
					"collection_symbol": "boryoku_dragonz",
					"mint": "62xNb1N5xjU3ANrf79jv9RGjmMQ84ozaPSWUFXnDC7Lx"
				},
				"seller_address": null,
				"slot": 128382705,
				"source": "magiceden_v2",
				"step": 0,
				"totalSteps": 1,
				"txName": "buy",
				"mintObject": {
					"mintAddress": "62xNb1N5xjU3ANrf79jv9RGjmMQ84ozaPSWUFXnDC7Lx",
					"img": "https://arweave.net/e0J1OZHi03PgtN7XzykNoTJvL-4XWCsxoNa1o3dpqe4?ext=png",
					"supply": 1,
					"title": "Boryoku Dragonz #349",
					"content": "Bōryoku Dragonz is an exclusive collection of 1,111 Dragon NFTs on the Solana blockchain.",
					"attributes": [{
							"trait_type": "Generation",
							"value": "Genesis"
						},
						{
							"trait_type": "Type",
							"value": "Cosmic Green"
						},
						{
							"trait_type": "Head",
							"value": "None"
						},
						{
							"trait_type": "Eyes",
							"value": "3D Glasses"
						},
						{
							"trait_type": "Mouth",
							"value": "None"
						},
						{
							"trait_type": "Neck",
							"value": "Golden Chain"
						},
						{
							"trait_type": "Background",
							"value": "Japanese"
						}
					],
					"updateAuthority": "DRGNjvBvnXNiQz9dTppGk1tAsVxtJsvhEmojEfBU3ezf",
					"primarySaleHappened": 1,
					"sellerFeeBasisPoints": 500,
					"creators": [{
						"address": "DRGNjvBvnXNiQz9dTppGk1tAsVxtJsvhEmojEfBU3ezf",
						"verified": 1,
						"share": 100
					}],
					"propertyCategory": "image",
					"externalUrl": "https://boryokudragonz.io",
					"properties": {
						"files": [{
							"uri": "https://arweave.net/e0J1OZHi03PgtN7XzykNoTJvL-4XWCsxoNa1o3dpqe4?ext=png",
							"type": "image/png"
						}],
						"category": "image",
						"creators": [{
							"address": "DRGNjvBvnXNiQz9dTppGktAsVxtJsvhEmojEfBU3ezf",
							"share": 100
						}]
					},
					"onChainCollection": null,
					"onChainName": "Boryoku Dragonz #349"
				}
			},
        ]
	},
    
}]

```

### Raw Output

The raw output looks as following

```jsonc
[{
	"basicInformation": {
		"symbol": "boryoku_dragonz",
		"enabledAttributesFilters": true,
		"availableAttributes": [{
				"count": 6,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Yellow"
				}
			},
			{
				"count": 2,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Grey"
				}
			},
			{
				"count": 1,
				"floor": 260000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Pink"
				}
			},
			{
				"count": 1,
				"floor": 300000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Japanese"
				}
			},
			{
				"count": 1,
				"floor": 332000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Beige"
				}
			},
			{
				"count": 1,
				"floor": 345000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Lavender"
				}
			},
			{
				"count": 2,
				"floor": 370000000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Green"
				}
			},
			{
				"count": 1,
				"floor": 499690000000,
				"attribute": {
					"trait_type": "Background",
					"value": "Tron"
				}
			},
			{
				"count": 2,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Synthwave Shades"
				}
			},
			{
				"count": 3,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Laughing Goggles"
				}
			},
			{
				"count": 1,
				"floor": 265000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Red Eyes"
				}
			},
			{
				"count": 1,
				"floor": 275000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Classic Eyes"
				}
			},
			{
				"count": 1,
				"floor": 285000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Blue Eyes"
				}
			},
			{
				"count": 2,
				"floor": 300000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "3D Glasses"
				}
			},
			{
				"count": 1,
				"floor": 332000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Vipers"
				}
			},
			{
				"count": 1,
				"floor": 345000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Tracker"
				}
			},
			{
				"count": 3,
				"floor": 370000000000,
				"attribute": {
					"trait_type": "Eyes",
					"value": "Golden Shades"
				}
			},
			{
				"count": 16,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Generation",
					"value": "Genesis"
				}
			},
			{
				"count": 2,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Head",
					"value": "Fireball"
				}
			},
			{
				"count": 10,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Head",
					"value": "None"
				}
			},
			{
				"count": 1,
				"floor": 345000000000,
				"attribute": {
					"trait_type": "Head",
					"value": "Croc"
				}
			},
			{
				"count": 1,
				"floor": 435000000000,
				"attribute": {
					"trait_type": "Head",
					"value": "Eye"
				}
			},
			{
				"count": 1,
				"floor": 499690000000,
				"attribute": {
					"trait_type": "Head",
					"value": "Slug"
				}
			},
			{
				"count": 1,
				"floor": 4200000000000,
				"attribute": {
					"trait_type": "Legendary",
					"value": "The Astro"
				}
			},
			{
				"count": 6,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "None"
				}
			},
			{
				"count": 3,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "Bubble Gum"
				}
			},
			{
				"count": 3,
				"floor": 270000000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "Pacifier"
				}
			},
			{
				"count": 1,
				"floor": 275000000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "Flame"
				}
			},
			{
				"count": 1,
				"floor": 285000000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "Ice Breath"
				}
			},
			{
				"count": 1,
				"floor": 370000000000,
				"attribute": {
					"trait_type": "Mouth",
					"value": "Rainbow Puke"
				}
			},
			{
				"count": 1,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Neck",
					"value": "Silver Chain"
				}
			},
			{
				"count": 7,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Neck",
					"value": "None"
				}
			},
			{
				"count": 5,
				"floor": 260000000000,
				"attribute": {
					"trait_type": "Neck",
					"value": "Golden Chain"
				}
			},
			{
				"count": 1,
				"floor": 285000000000,
				"attribute": {
					"trait_type": "Neck",
					"value": "Collar"
				}
			},
			{
				"count": 1,
				"floor": 370000000000,
				"attribute": {
					"trait_type": "Neck",
					"value": "Diamond Chain"
				}
			},
			{
				"count": 1,
				"floor": 250000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Diamond Purple"
				}
			},
			{
				"count": 1,
				"floor": 255690000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Neon Orange"
				}
			},
			{
				"count": 1,
				"floor": 260000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Diamond Orange"
				}
			},
			{
				"count": 2,
				"floor": 265000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Cyber Grey"
				}
			},
			{
				"count": 2,
				"floor": 270000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Iron Yellow"
				}
			},
			{
				"count": 1,
				"floor": 285000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Zombie Golden"
				}
			},
			{
				"count": 1,
				"floor": 300000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Cosmic Green"
				}
			},
			{
				"count": 1,
				"floor": 332000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Zombie Blue"
				}
			},
			{
				"count": 1,
				"floor": 345000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Neon Blue"
				}
			},
			{
				"count": 2,
				"floor": 370000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Skeleton Golden"
				}
			},
			{
				"count": 1,
				"floor": 499690000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Cyber Blue"
				}
			},
			{
				"count": 1,
				"floor": 500000000000,
				"attribute": {
					"trait_type": "Type",
					"value": "Cyber Black"
				}
			}
		],
		"floorPrice": 250000000000,
		"listedCount": 16,
		"listedTotalValue": 9252380000000,
		"avgPrice24hr": 260781666666.66666,
		"volume24hr": 1564690000000,
		"volumeAll": 123208009176840
	},
	"salesInformation": {
		"results": [{
			"_id": "624ca16cbea360023d4ab06c",
			"transaction_id": "5xEpY1ekRjym6WMAteTVzVKHqtm645f1uTdFGP3wEHWgzBJ5uk9nc9Ns4hE3AR1fWvNvexcohAGBsUq2sZk1qfBA",
			"txType": "placeBid",
			"blockTime": 1649189212,
			"buyer_address": "BakZMixrKdJgZn9dx1fe5GK1EbToVP7yyrBp4tYtjZJ",
			"collection_symbol": "boryoku_dragonz",
			"createdAt": "2022-04-05T20:07:08.504Z",
			"mint": "62xNb1N5xjU3ANrf79jv9RGjmMQ84ozaPSWUFXnDC7Lx",
			"notifiable": true,
			"onChainCollectionAddress": null,
			"parsedPlacebid": {
				"TxType": "placeBid",
				"buyer_address": "BakZMixrKdJgZn9dx1fe5GK1EbToVP7yyrBp4tYtjZJ",
				"token_address": "62xNb1N5xjU3ANrf79jv9RGjmMQ84ozaPSWUFXnDC7Lx",
				"amount": 200000000000,
				"collection_symbol": "boryoku_dragonz",
				"mint": "62xNb1N5xjU3ANrf79jv9RGjmMQ84ozaPSWUFXnDC7Lx"
			},
			"seller_address": null,
			"slot": 128382705,
			"source": "magiceden_v2",
			"step": 0,
			"totalSteps": 1,
			"txName": "buy",
			"mintObject": {
				"mintAddress": "62xNb1N5xjU3ANrf79jv9RGjmMQ84ozaPSWUFXnDC7Lx",
				"img": "https://arweave.net/e0J1OZHi03PgtN7XzykNoTJvL-4XWCsxoNa1o3dpqe4?ext=png",
				"supply": 1,
				"title": "Boryoku Dragonz #349",
				"content": "Bōryoku Dragonz is an exclusive collection of 1,111 Dragon NFTs on the Solana blockchain.",
				"attributes": [{
						"trait_type": "Generation",
						"value": "Genesis"
					},
					{
						"trait_type": "Type",
						"value": "Cosmic Green"
					},
					{
						"trait_type": "Head",
						"value": "None"
					},
					{
						"trait_type": "Eyes",
						"value": "3D Glasses"
					},
					{
						"trait_type": "Mouth",
						"value": "None"
					},
					{
						"trait_type": "Neck",
						"value": "Golden Chain"
					},
					{
						"trait_type": "Background",
						"value": "Japanese"
					}
				],
				"updateAuthority": "DRGNjvBvnXNiQz9dTppGk1tAsVxtJsvhEmojEfBU3ezf",
				"primarySaleHappened": 1,
				"sellerFeeBasisPoints": 500,
				"creators": [{
					"address": "DRGNjvBvnXNiQz9dTppGk1tAsVxtJsvhEmojEfBU3ezf",
					"verified": 1,
					"share": 100
				}],
				"propertyCategory": "image",
				"externalUrl": "https://boryokudragonz.io",
				"properties": {
					"files": [{
						"uri": "https://arweave.net/e0J1OZHi03PgtN7XzykNoTJvL-4XWCsxoNa1o3dpqe4?ext=png",
						"type": "image/png"
					}],
					"category": "image",
					"creators": [{
						"address": "DRGNjvBvnXNiQz9dTppGktAsVxtJsvhEmojEfBU3ezf",
						"share": 100
					}]
				},
				"onChainCollection": null,
				"onChainName": "Boryoku Dragonz #349"
			}
		}]
	},
	"listingsInformation": [{
		"id": "5G7sJBo2RjdpauBYKaVcM4HTwgSFD5xWR5e7zfwKhRpE",
		"price": 250,
		"escrowPubkey": "3Cza7HBWpGAevGeq6rEiyvhjGW6BCHstqA4zbgNT6Xwk",
		"owner": "HB6CeH8WT3nr8XKaPCzuqZxBhWxX1tidCAJE32VmyDAE",
		"collectionName": "boryoku_dragonz",
		"collectionTitle": "Boryoku Dragonz",
		"img": "https://arweave.net/id_DvpA7zhVVtQtLKRVIx6LAQ43epLRrfbA66DcPdow?ext=png",
		"title": "Boryoku Dragonz #228",
		"content": "Bōryoku Dragonz is an exclusive collection of 1,111 Dragon NFTs on the Solana blockchain.",
		"externalURL": "https://boryokudragonz.io",
		"propertyCategory": "image",
		"creators": [{
			"address": "DRGNjvBvnXNiQz9dTppGk1tAsVxtJsvhEmojEfBU3ezf",
			"verified": 1,
			"share": 100
		}],
		"sellerFeeBasisPoints": 500,
		"mintAddress": "BKBrRzEVxR5axhN4kpeBm4krrPNUpQjvH831WQqiKFuq",
		"attributes": [{
				"trait_type": "Generation",
				"value": "Genesis"
			},
			{
				"trait_type": "Type",
				"value": "Diamond Purple"
			},
			{
				"trait_type": "Head",
				"value": "Fireball"
			},
			{
				"trait_type": "Eyes",
				"value": "Synthwave Shades"
			},
			{
				"trait_type": "Mouth",
				"value": "None"
			},
			{
				"trait_type": "Neck",
				"value": "Silver Chain"
			},
			{
				"trait_type": "Background",
				"value": "Yellow"
			}
		],
		"properties": {
			"files": [{
				"uri": "https://arweave.net/id_DvpA7zhVVtQtLKRVIx6LAQ43epLRrfbA66DcPdow?ext=png",
				"type": "image/png"
			}],
			"category": "image",
			"creators": [{
				"address": "DRGNjvBvnXNiQz9dTppGktAsVxtJsvhEmojEfBU3ezf",
				"share": 100
			}]
		},
		"supply": 1,
		"updateAuthority": "DRGNjvBvnXNiQz9dTppGk1tAsVxtJsvhEmojEfBU3ezf",
		"primarySaleHappened": 1,
		"onChainCollection": {},
		"tokenDelegateValid": false,
		"v2": {
			"auctionHouseKey": "E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe",
			"sellerReferral": "autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2",
			"expiry": -1
		},
		"rarity": {
			"moonrank": {
				"rank": 266
			},
			"howrare": {
				"rank": 679
			}
		}
	}]
}]

```
