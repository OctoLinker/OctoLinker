import $ from 'jquery';

export default async urls => {
  for (const { url, func, method = 'HEAD' } of urls) {
    try {
      if (func) {
        return {
          // eslint-disable-next-line
          url: await func(),
        };
      }

      // Normally, you wouldn't use `await` inside of a loop.
      // However, we explicity want to do this sequentially.
      // See http://eslint.org/docs/rules/no-await-in-loop
      // eslint-disable-next-line
      const res = await $.ajax({
        method,
        url,
      });

      return { url, res };
    } catch (err) {
      // There's nothing to do here, so just keep going.
      // eslint-disable-line no-empty
    }
  }

  // If we get here, no urls could be loaded.
  throw new Error('Could not load any url');
};
