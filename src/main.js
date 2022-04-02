import Apify from 'apify';
import playwright from 'playwright';
import { LABELS } from './consts.js';
import { handleMagicEdenListings, handleMagicEdenSales, handleMagicEdenBasic } from './routes.js';
import { requestBuilder } from './utils.js';
import { generateListingsInformation } from './dataObject.js';

const { utils: { log } } = Apify;

Apify.main(async () => {

    const { startUrls, sendRaw = false, getOnlySales = false, maxConcurrency, proxy = { useApifyProxy: true } } = await Apify.getInput();
    const state = await Apify.getValue('STATE') || {};
    const failedItems = await Apify.getValue('FAILED_ITEMS') || [];

    Apify.events.on('persistState', async () => {
        await Apify.setValue('STATE', state);
        await Apify.setValue('FAILED_ITEMS', failedItems)
    });

    const requestQueue = await Apify.openRequestQueue();

    await requestBuilder(startUrls, requestQueue);

    const proxyConfiguration = await Apify.createProxyConfiguration(proxy);

    // headless gets several blocks || captcha
    const crawler = new Apify.PlaywrightCrawler({
        requestQueue,
        proxyConfiguration,
        maxConcurrency: maxConcurrency || 10,
        handlePageTimeoutSecs: 20,
        launchContext: {
            launcher: playwright.firefox,
        },
        preNavigationHooks: [
            async (_, gotoOptions) => {
                gotoOptions.waitUntil = 'load';
            },
        ],
        handlePageFunction: async (context) => {
            const { url, userData: { label } } = context.request;
            log.info('Sending request...', { label, url });
            switch (label) {
                case LABELS.MAGICEDEN_BASIC:
                    return handleMagicEdenBasic(context, requestQueue, sendRaw, state);
                case LABELS.MAGICEDEN_SALES:
                    return handleMagicEdenSales(context, requestQueue, sendRaw, getOnlySales, state);
                case LABELS.MAGICEDEN_LISTINGS:
                    return handleMagicEdenListings(context, sendRaw, state);
                default:
                    throw new Error('invalid Label!');
            }
        },
        handleFailedRequestFunction: async ({request}) => {
            failedItems.push(request.url)
        }
    });

    log.info('Starting the scrape.');
    await crawler.run();
    log.info('Pushing the data to the dataset...');

    await Apify.setValue('STATE', state);
    for (const item of Object.keys(state)) {
        if (!getOnlySales && !sendRaw) generateListingsInformation(item, state);
        await Apify.pushData(state[item]);
    }
    if (failedItems.length) {
        throw new Error(`${failedItems.length} Invalid Input(s):
        --------------
        ${failedItems} 
        --------------
        The input format should be as following:
        https://magiceden.io/marketplace/boryoku_dragonz`)
    }

    log.info(`Run finished successfully.
    Tipjar: 6RsGMzf91c51THxwmt2tq78sxJvPm3PiQBEyJHDXog64`);
});
