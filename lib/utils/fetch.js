import $ from 'jquery';

export default async (urls) => {
  for (const { url, method = 'HEAD' } of urls) {
    try {
      // Normally, you wouldn't use `await` inside of a loop.
      // However, we explicity want to do this sequentially.
      // See http://eslint.org/docs/rules/no-await-in-loop
      const res = await $.ajax({ // eslint-disable-line no-await-in-loop
        method,
        url,
      });

      return { url, res };
    } catch (err) {

    }
  }

  // If we get here, no urls could be loaded.
  throw new Error('Could not load any url');
};
