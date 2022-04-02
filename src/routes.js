/* eslint-disable max-len */
import { load } from 'cheerio';
import { LABELS } from './consts.js';
import { basicInformation, listingsInformation, salesInformation } from './dataObject.js';
import { enqueueListings } from './utils.js';

export const handleMagicEdenBasic = async ({ request, page }, requestQueue, sendRaw, state) => {
    const { collection } = request.userData;
    const $ = load(await page.content());
    const response = JSON.parse($('pre').text());

    if (!response.results.floorPrice & !response.results.volumeAll) throw new Error(`Invalid Collection Name, The input format should be as following:
    https://magiceden.io/marketplace/boryoku_dragonz`)

    const basicData = sendRaw ? response.results : basicInformation(response.results);
    state[collection] = {
        basicInformation: basicData,
        salesInformation: [],
    }

    await requestQueue.addRequest({
        url: `https://api-mainnet.magiceden.io/rpc/getGlobalActivitiesByQuery?q=%7B%22%24match%22%3A%7B%22collection_symbol%22%3A%22${collection}%22%7D%2C%22%24sort%22%3A%7B%22blockTime%22%3A-1%7D%2C%22%30skip%22%3A0%7D`,
        userData: {
            label: LABELS.MAGICEDEN_SALES,
            collection,
            basicData,
        },
    });
};

export const handleMagicEdenSales = async ({ page, request }, requestQueue, sendRaw, getOnlySales, state) => {
    const { basicData, collection } = request.userData;

    const $ = load(await page.content());
    const response = JSON.parse($('pre').text());

    const salesData = sendRaw ? response : salesInformation(response);

    const userData = {
        label: LABELS.MAGICEDEN_LISTINGS,
        basicData,
        salesData,
        collection,
    }

    state[collection].salesInformation = salesData;
    if (!getOnlySales) {
        state[collection].listingsInformation = [];
        await enqueueListings(requestQueue, userData);
    }
    
};

export const handleMagicEdenListings = async ({ request, page }, sendRaw, state) => {
    const $ = load(await page.content());
    const { collection } = request.userData;
    const response = JSON.parse($('pre').text())
    const listingsData = sendRaw ? response.results : listingsInformation(response);

    state[collection].listingsInformation.push(...listingsData);

};
