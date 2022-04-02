// tbd
// else if (domain === SOURCES.ALPHA) {
//     await requestQueue.addRequest({
//         url: `https://apis.alpha.art/api/v1/collection`,
//         method: 'POST',
//         userData: {
//             label: LABELS.ALPHA_ESCROW,
//         },
//         payload: JSON.stringify(`{"collectionId":"${collection}","orderBy":"PRICE_LOW_TO_HIGH","status":["BUY_NOW"],"traits":[]}`),
//     });

//     await requestQueue.addRequest({
//         url: `https://apis.alpha.art/api/v1/collection`,
//         method: 'POST',
//         userData: {
//             label: LABELS.ALPHA_SALES,
//         },
//         payload: JSON.stringify(`{"collectionId":"${collection}","orderBy":"PRICE_LOW_TO_HIGH","status":["BUY_NOW"],"traits":[]}`),
//     });

//     // {"id":"degods","resourceType":"COLLECTION","tradingTypes":["SALE"],"before":"2021-12-10T09:06:56Z","limit":20,"noForeignListing":true}
// } else if (domain === SOURCES.SOLANART) {
//     await requestQueue.addRequest({
//         url: `https://qzlsklfacc.medianetwork.cloud/query_volume_per_collection?collection=${collection}`,
//         userData: {
//             label: LABELS.SOLANART_ESCROW,
//         },
//     });

//     await requestQueue.addRequest({
//         url: `https://qzlsklfacc.medianetwork.cloud/all_sold_per_collection?collection=${collection}`,
//         userData: {
//             label: LABELS.SOLANART_SALES,
//         },
//     });

//     await requestQueue.addRequest({
//         url: `https://qzlsklfacc.medianetwork.cloud/get_nft?collection=${collection}&page=0&limit=30&order=&fits=any&trait=&search=&min=0&max=0&listed=true&ownedby=&attrib_count=&bid=all`,
//         userData: {
//             label: LABELS.SOLANART_LISTINGS,
//         },
//     });
// } ;