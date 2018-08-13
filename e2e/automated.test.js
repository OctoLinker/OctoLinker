require('dotenv').config();

const fixtures = require('./fixtures.json'); // eslint-disable-line import/no-unresolved
const diffFixtures = require('./diff-fixtures.json'); // eslint-disable-line import/no-unresolved

async function executeTest(url, targetUrl, selector) {
  await page.goto(url);

  await page.waitForSelector(selector);

  await Promise.all([
    page.waitForNavigation(),
    // page.click(selector), for some reason page.click is not working
    page.$eval(selector, el => el.click()),
  ]);

  await expect(page.url()).toEqual(expect.stringMatching(targetUrl));
}

jest.setTimeout(20000);

describe('End to End tests', () => {
  beforeAll(async () => {
    if (!process.env.E2E_USER_NAME || !process.env.E2E_USER_PASSWORD) {
      console.log('Run E2E tests as an anonymous user'); // eslint-disable-line
      return;
    }

    console.log('Perform login ...'); // eslint-disable-line

    await page.goto('https://github.com/login');
    await expect(page).toFill('#login_field', process.env.E2E_USER_NAME);
    await expect(page).toFill('#password', process.env.E2E_USER_PASSWORD);
    await Promise.all([
      page.waitForNavigation(),
      expect(page).toClick('input[type=submit]'),
    ]);

    try {
      const authError = await page.$eval('#login .flash-error', el =>
        el.textContent.trim(),
      );
      throw new Error(authError);
    } catch (error) {
      if (!error.message.includes('failed to find element matching selector')) {
        await expect(error).toBeUndefined();
      }
    }

    console.log('Run E2E tests with authenticated user'); // eslint-disable-line
  });

  describe('single blob', () => {
    fixtures.forEach(({ url, content, lineNumber, targetUrl }) => {
      it(`resolves ${content} to ${targetUrl}`, async () => {
        await executeTest(url, targetUrl, `#LC${lineNumber} .octolinker-link`);
      });
    });
  });

  describe('diff view', () => {
    diffFixtures.forEach(({ url, targetUrl }) => {
      it(`resolves ${url} to ${targetUrl}`, async () => {
        await executeTest(
          url,
          targetUrl,
          '.selected-line.blob-code .octolinker-link',
        );
      });
    });
  });
});
