describe('OctoLinker example test', () => {
  beforeAll(async () => {
    await page.goto(
      'https://github.com/OctoLinker/OctoLinker/blob/223984b54c9efac4fb76e33cf97283eebcbcae56/packages/core/octo-linker.js',
    );
    await page.waitForSelector('.octolinker-link');
  });

  it('should redirect to https://github.com/OctoLinker/injection', async () => {
    await page.click('.octolinker-link');
    await page.waitForNavigation();
    await expect(page.url()).toMatch('https://github.com/OctoLinker/injection');
  });
});
