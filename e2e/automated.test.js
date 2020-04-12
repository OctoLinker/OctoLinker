require('dotenv').config();

const fixtures = require('./fixtures.json'); // eslint-disable-line import/no-unresolved
const diffFixtures = require('./diff-fixtures.json'); // eslint-disable-line import/no-unresolved

async function executeTest(url, targetUrl, selector) {
  if ((await page.url()) !== url) {
    await page.goto(url);
  }

  await page.waitForSelector(`${selector}[href$="${targetUrl}"]`);
}

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
      const authError = await page.$eval('#login .flash-error', (el) =>
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
        if (lineNumber) {
          await executeTest(
            url,
            targetUrl,
            `#LC${lineNumber} .octolinker-link`,
          );
        } else {
          await executeTest(
            url,
            targetUrl,
            `.octolinker-link[href="${targetUrl}"]`,
          );
        }
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

    it('links commentbox', async () => {
      await executeTest(
        'https://github.com/OctoLinker/OctoLinker/pull/451/files',
        'https://nodejs.org/api/path.html',
        '.highlight-source-js .octolinker-link',
      );
    });
  });

  describe.skip('expanded blob', () => {
    it('should resolve after appending new blobs', async () => {
      const url =
        'https://github.com/OctoLinker/OctoLinker/pull/451/files#diff-b9cfc7f2cdf78a7f4b91a753d10865a2';
      const selector = '[data-line-number="45"] + td .octolinker-link';
      const expandSelector = '[data-right-range="44-55"]';

      await page.goto(url);

      await page.click(expandSelector);

      await page.waitForSelector(selector);
    });
  });
});
