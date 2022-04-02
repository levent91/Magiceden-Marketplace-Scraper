/* eslint-disable max-len */
import { SOURCES, LABELS } from './consts.js';

export const requestBuilder = async (startUrls, requestQueue) => {
    for (const { url } of startUrls) {
        const domain = url.match(/[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/)[0];
        const collection = url.split('/')[4];
        // tba other marketplaces check tbdjs
        if (domain === SOURCES.MAGICEDEN) {
            await requestQueue.addRequest({
                url: `https://api-mainnet.magiceden.io/rpc/getCollectionEscrowStats/${collection}`,
                userData: {
                    label: LABELS.MAGICEDEN_BASIC,
                    collection,
                },
            });
        } else {
            throw new Error(
            `Invalid domain, only collections from magiceden.io are available
            Example input url:
            https://magiceden.io/marketplace/shadowy_super_coder_dao`,
            );
        }
    }
};

export const enqueueListings = async (requestQueue, userData) => {
    for (let i = 0; i < userData.basicData.listedCount + 20; i += 20) {
        await requestQueue.addRequest({
            url: `https://api-mainnet.magiceden.io/rpc/getListedNFTsByQuery?q=%7B%22%24match%22%3A%7B%22collectionSymbol%22%3A%22${userData.collection}%22%7D%2C%22%24sort%22%3A%7B%22takerAmount%22%3A1%2C%22createdAt%22%3A-1%7D%2C%22%24skip%22%3A${i}%2C%22%24limit%22%3A100000%7D`,
            userData,
        });
    }
};

