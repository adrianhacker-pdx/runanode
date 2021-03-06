import path from 'path';
import { Application } from 'spectron';
import { defineSupportCode } from 'cucumber';
import electronPath from 'electron';
import { TEST } from '../../app/common/types/environment.types';
import {
  generateScreenshotFilePath,
  getTestNameFromTestFile,
  saveScreenshot,
} from './helpers/screenshot';
import { refreshClient } from './helpers/app-helpers';

const context = {};
const DEFAULT_TIMEOUT = 40000;
let scenariosCount = 0;

const printMainProcessLogs = () =>
  context.app.client.getMainProcessLogs().then(logs => {
    return true;
  });

const startApp = async () => {
  const app = new Application({
    path: electronPath,
    args: ['./app/main.prod.js'],
    // requireName: 'spectronRequire',
    env: Object.assign({}, process.env, {
      NODE_ENV: TEST,
    }),
    // startTimeout: DEFAULT_TIMEOUT,
    waitTimeout: DEFAULT_TIMEOUT,
    chromeDriverLogPath: path.join(__dirname, '../../dist/logs/chrome-driver.log'),
    webdriverLogPath: path.join(__dirname, '../../dist/logs/webdriver'),
  });
  await app.start();
  await app.client.waitUntilWindowLoaded();
  return app;
};

defineSupportCode(({ BeforeAll, Before, After, AfterAll, setDefaultTimeout }) => {
  // The cucumber timeout should be high (and never reached in best case)
  // because the errors thrown by webdriver.io timeouts are more descriptive
  // and helpful than "this step timed out after 5 seconds" messages
  setDefaultTimeout(DEFAULT_TIMEOUT + 2000);

  // Boot up the electron app before all features
  BeforeAll({ timeout: 5 * 60 * 1000 }, async () => {
    context.app = await startApp();
  });

  // Make the electron app accessible in each scenario context
  Before({ timeout: DEFAULT_TIMEOUT * 2 }, async function() {
    this.app = context.app;
    this.client = context.app.client;
    this.browserWindow = context.app.browserWindow;

    // Set timeouts of various operations:

    // Determines when to interrupt a script that is being evaluated.
    this.client.timeouts('script', DEFAULT_TIMEOUT);
    // Provides the timeout limit used to interrupt navigation of the browsing context.
    this.client.timeouts('pageLoad', DEFAULT_TIMEOUT);
    // Do not set 'implicit' timeout here because of this issue:
    // https://github.com/webdriverio/webdriverio/issues/974

    // Reset backend
    // await this.client.executeAsync((done) => {
    //   const resetBackend = () => {
    //
    //     // if (app.stores.networkStatus.isConnected) {
    //     //   app.api.ada.testReset()
    //     //     .then(app.api.localStorage.reset)
    //     //     .then(done)
    //     //     .catch((error) => { throw error; });
    //     // } else {
    //     //   setTimeout(resetBackend, 60);
    //     // }
    //   };
    //   resetBackend();
    // });

    // Load fresh root url with test environment for each test case
    await refreshClient(this.client);

    // Ensure that frontend is synced and ready before test case
    // await this.client.executeAsync((done) => {
    //   const waitUntilSyncedAndReady = () => {
    //     // if (app.stores.networkStatus.isSynced) {
    //     //   done();
    //     // } else {
    //     //   setTimeout(waitUntilSyncedAndReady, 60);
    //     // }
    //   };
    //   waitUntilSyncedAndReady();
    // });
  });

  // this ensures that the spectron instance of the app restarts
  // after the node update acceptance test shuts it down via 'kill-process'
  // eslint-disable-next-line prefer-arrow-callback
  After({ tags: '@restartApp' }, async function() {
    context.app = await startApp();
  });

  // eslint-disable-next-line prefer-arrow-callback
  After(async function({ sourceLocation, result }) {
    scenariosCount++;
    if (result.status === 'failed') {
      const testName = getTestNameFromTestFile(sourceLocation.uri);
      const file = generateScreenshotFilePath(testName);
      await saveScreenshot(context.app, file);
      await printMainProcessLogs();
    }
  });

  // eslint-disable-next-line prefer-arrow-callback
  AfterAll(async function() {
    const allWindowsClosed = (await context.app.client.getWindowCount()) === 0;
    if (allWindowsClosed || !context.app.running) return;
    if (scenariosCount === 0) {
      await printMainProcessLogs();
    }
    if (process.env.KEEP_APP_AFTER_TESTS === 'true') {
      return;
    }
    return context.app.stop();
  });
});
