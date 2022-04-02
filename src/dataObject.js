import { LAMPORT } from './consts.js';

export const basicInformation = ({
    collection,
    symbol,
    floorPrice,
    listedCount,
    listedTotalValue,
    avgPrice24hr,
    volume24hr,
    volumeAll,
}) => {
    return {
        collection,
        symbol,
        floorPrice: floorPrice / LAMPORT,
        listedCount,
        listedTotalValue: listedTotalValue / LAMPORT,
        avgPrice24hr: avgPrice24hr / LAMPORT,
        volume24hr: volume24hr / LAMPORT,
        volumeAll: volumeAll / LAMPORT,
    };
};

export const salesInformation = (response) => {
    const saleTxs = response.results.filter(activity => activity.txType === 'exchange' || activity.txType === 'acceptBid');
    const salesArray = [];
    for (const sale of saleTxs) {
        salesArray.push({
            transactionId: sale.transaction_id,
            txTime: sale.createdAt,
            mint: sale.parsedTransaction.mint,
            sellerAddress: sale.parsedTransaction.seller_address,
            buyerAddress: sale.parsedTransaction.buyer_address,
            amount: sale.parsedTransaction.total_amount / LAMPORT,
            img: sale.mintObject.img,
            title: sale.mintObject.title,
            source: sale.source,
        });
    }

    const sellerAdresses = salesArray.map(tx => tx.sellerAddress);
    const buyerAddresses = salesArray.map(tx => tx.buyerAddress);
    const prices = salesArray.map(tx => tx.amount);
    const theMostFrequentBuyer = mostRepeatedItem(buyerAddresses);
    const theMostFrequentSeller = mostRepeatedItem(sellerAdresses);
    const uniqueBuyers = Array.from(new Set(buyerAddresses)).length;
    const uniqueSellers = Array.from(new Set(sellerAdresses)).length

    const salesInfo = {
        fetchedSales: salesArray.length,
        averagePrice: prices.reduce( ( p, c ) => p + c, 0 ) / prices.length,
        uniqueBuyers,
        uniqueBuyerPercentage: parseFloat((uniqueBuyers / salesArray.length * 100).toFixed(2), 10),
        theMostFrequentBuyer,
        theMostFrequentBuyerBuyCount: countOccurrences(buyerAddresses, theMostFrequentBuyer),
        uniqueSellers,
        uniqueSellersPercentage: parseFloat((uniqueSellers / salesArray.length * 100).toFixed(2), 10),
        theMostFrequentSeller,
        theMostFrequentSellerSellCount: countOccurrences(sellerAdresses, theMostFrequentSeller),
        sales: salesArray,
    }
    return salesInfo;
};

export const listingsInformation = (response) => {
    const listingsArray = [];
    for (const listing of response.results) {
       listingsArray.push({
            id: listing.id,
            createdAt: listing.createdAt,
            mintAddress: listing.mintAddress,
            owner: listing.owner,
            price: listing.price,
            title: listing.title,
            image: listing.img,
            rarity: listing?.rarity?.moonrank?.rank || null,
        });
    }
    return listingsArray;
};

export const generateListingsInformation = (item, state) => {
    const ownerAdresses = state[item].listingsInformation.map(listItem => listItem.owner);
    const uniqueListers = Array.from(new Set(ownerAdresses)).length;
    const mostFrequentLister = mostRepeatedItem(ownerAdresses)

    const listingsInfo = {
        totalListed: state[item].listingsInformation.length,
        uniqueListers,
        uniqueListersPercentage: parseFloat((uniqueListers / state[item].listingsInformation.length * 100).toFixed(2), 10), 
        mostFrequentLister: mostRepeatedItem(ownerAdresses),
        theMostFrequentListerListCount: countOccurrences(ownerAdresses, mostFrequentLister),
        lists: state[item].listingsInformation,
    }

    state[item].listingsInformation = listingsInfo;
}

export const mostRepeatedItem = (arr) => {
    const obj = arr.reduce((acc, val) => {
     acc[val] = (acc[val] || 0 ) + 1
     return acc
  },{})
 return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b)
 };

 const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);