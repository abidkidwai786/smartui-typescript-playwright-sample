import { chromium, ChromiumBrowser, Page } from 'playwright';

const credentials = {
    user: process.env.LT_USERNAME || '<your_username>',
    key: process.env.LT_ACCESS_KEY || '<your_accessKey>',
};

const capabilities = {
    browserName: 'Chrome',
    browserVersion: 'latest',
    'LT:Options': {
        platform: 'Windows 10',
        build: 'Playwright TypeScript Sample Build',
        name: 'Playwright TypeScript Sample Test',
        user: credentials.user,
        accessKey: credentials.key,
        network: true,
        video: true,
        console: true,
        'smartUI.project': 'Testing Playwright TypeScript Sample',
    },
};

async function runTest(): Promise<void> {
    const browser: ChromiumBrowser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`,
    });

    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto('https://www.lambdatest.com/');
    const title = await page.title();

    try {
        const expectedTitle = 'Next-Generation Mobile Apps and Cross Browser Testing Cloud | LambdaTest';
        if (title === expectedTitle) {
            await page.evaluate((_) => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`);
        } else {
            throw new Error('Title not matched');
        }
    } catch {
        await page.evaluate((_) => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`);
    }

    await page.evaluate((_) => { }, `lambdatest_action: ${JSON.stringify({ action: 'smartui.takeScreenshot', arguments: { fullPage: true, screenshotName: '<Your Screenshot Name>' } })}`);

    await browser.close();
}

runTest();
