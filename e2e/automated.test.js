const urls = require('./urls.json'); // eslint-disable-line import/no-unresolved

async function insertResolveUrlsIntoDom() {
  return page.evaluate(() => {
    document.querySelectorAll('.octolinker-link').forEach(node => {
      const resolveto = node
        .closest('tr')
        .previousElementSibling.textContent.trim()
        .replace('// Should resolve to: ', '');
      node.dataset.e2eResult = resolveto;
    });
  });
}

async function goto(url) {
  await page.goto(url);
  await page.waitForSelector('.octolinker-link');

  await insertResolveUrlsIntoDom();

  await page.click('.octolinker-link');
  const result = await page.$eval(
    '.octolinker-link',
    el => el.dataset.e2eResult,
  );
  await page.waitForNavigation();

  // TODO remove double slash fix
  await expect(page.url().replace(/\/\//g, '/')).toEqual(
    expect.stringMatching(result.replace('<root>', '')),
  );
}

describe('End to End tests', () => {
  urls.forEach(url => {
    it(`resolves ${url}`, async () => {
      await goto(url);
    });
  });
});
