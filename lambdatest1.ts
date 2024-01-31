import { chromium, ChromiumBrowser, Page } from 'playwright';
import { promisify } from 'util';

const delay = promisify(setTimeout);

// Importing the LambdaTest tunnel module
var lambdaTunnel = require("@lambdatest/node-tunnel");

// LambdaTest credentials
const credentials = {
    user: process.env.LT_USERNAME || '<your_username>',
    key: process.env.LT_ACCESS_KEY || '<your_accessKey>',
};

// Creating an instance of the LambdaTest tunnel
const tunnelInstance = new lambdaTunnel();

// Tunnel configuration
const tunnelArguments = {
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    tunnelName: 'Tunnel1'
};

// Function to start the LambdaTest tunnel
async function startTunnel() {
    try {
        // Creating a promise for tunnel start
        const tunnelPromise = new Promise<void>(async (resolve, reject) => {
            try {
                // Starting the LambdaTest tunnel
                await tunnelInstance.start(tunnelArguments); // STARING TUNNEL
                console.log("Tunnel is Running Successfully");
                resolve();
            } catch (err) {
                console.error("ERROR" + err);
                reject(err);
            }
        });

        // Waiting for the tunnel to be fully established
        await tunnelPromise;

        // Introducing a delay of 7 seconds after the tunnel has started
        console.log("_________________________________DELAYED 7 Seconds____________________________________");
        await delay(7000);

        // Your next step or code to execute after the tunnel has started successfully
        await runTest();

        await tunnelInstance.stop();  // STOPPING TUNNEL 
        console.log("Tunnel has been stopped.");



    } catch (err) {
        console.error("ERROR" + err);
        // Handle the error or take appropriate action if the tunnel start fails
    }
}

// Calling the function to start the tunnel
startTunnel();

console.log("After start tunnel");

// LambdaTest capabilities for Playwright
const capabilities = {
    browserName: 'Chrome',
    browserVersion: 'latest',
    'LT:Options': {
        platform: 'Windows 10',
        build: 'Playwright TypeScript Sample Build 1',
        name: 'Playwright TypeScript Sample Test 1',
        user: credentials.user,
        accessKey: credentials.key,
        network: true,
        video: true,
        console: true,
        tunnel: true,
        tunnelName: 'Tunnel1',
    },
};

// Function to run the actual test
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
