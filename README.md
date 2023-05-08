# LambdaTest SmartUI Playwright TypeScript Sample

This sample demonstrates how to use LambdaTest Grid for running Playwright tests with TypeScript for SmartUI Visual Regression Testing.

## Prerequisites

- Node.js installed (version 14 or higher)
- NPM installed (version 7 or higher)
- A LambdaTest account

## Getting Started

Follow the steps below to set up and run the sample project.

### Step 1: Clone the repository

Clone this repository to your local machine.

```bash
git clone https://github.com/lambdatest/smartui-typescript-playwright-sample.git
```

### Step 2: Install dependencies

Navigate to the project directory and install the required dependencies using the following command:

```bash
cd smartui-typescript-playwright-sample
npm i
```

### Step 3: Set up LambdaTest credentials

Set up your LambdaTest username and access key as environment variables. You can find these credentials in your [LambdaTest Profile](https://accounts.lambdatest.com/detail/profile).

```bash
export LT_USERNAME="your_username"
export LT_ACCESS_KEY="your_accessKey"
```

Replace `your_username` and `your_accessKey` with your LambdaTest credentials.

### Step 4: SmartUI.takeScreenshot Webhook

In this sample, we have used the `smartui.takeScreenshot` webhook to capture a screenshot for visual regression testing. This webhook triggers a screenshot capture at the specified step in your test script.

When you use the `smartui.takeScreenshot` webhook, you can pass additional arguments such as `fullPage` and `screenshotName`. The `fullPage` argument indicates whether the screenshot should capture the entire page or just the viewport. The `screenshotName` argument allows you to provide a custom name for the screenshot. This name is used when saving the screenshot and displaying it in the LambdaTest SmartUI dashboard.

Here's an example of how to use the `smartui.takeScreenshot` webhook in your test script:

```typescript
await page.evaluate((_) => { },
    `lambdatest_action: ${JSON.stringify({ action: "smartui.takeScreenshot", arguments: { fullPage: true, screenshotName: "Your Screenshot Name" } })}`);
```

This line of code captures a full-page screenshot and saves it with the provided custom name. The captured screenshot will be available for review and comparison in your LambdaTest SmartUI dashboard.

By leveraging the `smartui.takeScreenshot` webhook in your test scripts, you can easily capture relevant screenshots at different stages of your test execution. This will help you detect and analyze visual differences across various browser and device combinations, and ensure that your web application looks and functions as expected.

### Step 5: Run the test

Run the test using the following command:

```bash
npm test
```

This will execute the test on LambdaTest Grid using Playwright with TypeScript, and SmartUI will capture a screenshot for visual regression testing.

After the test is complete, you can view the test results, logs, screenshots, and videos on the [LambdaTest SmartUI Dashboard](https://www.smartui.lambdatest.com).

## Conclusion

In this sample project, we demonstrated how to set up and run a LambdaTest SmartUI test using LambdaTest Grid for Playwright with TypeScript. You can now use this setup as a starting point for creating more complex tests and integrating them into your CI/CD pipeline.