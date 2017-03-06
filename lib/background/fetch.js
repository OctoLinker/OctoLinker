import $ from 'jquery';

const track = action =>
  chrome.runtime.sendMessage({
    type: 'track',
    payload: {
      category: 'fetch',
      action,
    },
  });

export default async (urls) => {
  // TODO remove this and fix tests
  // Maybe use the following for mocking this module?
  // https://github.com/speedskater/babel-plugin-rewire
  chrome.runtime.sendMessage({
    type: 'fetch',
    payload: urls,
  });

  for (const { url, method = 'HEAD' } of urls) {
    try {
      // Normally, you wouldn't use `await` inside of a loop.
      // However, we explicity want to do this sequentially.
      // See http://eslint.org/docs/rules/no-await-in-loop
      const res = await $.ajax({ // eslint-disable-line no-await-in-loop
        method,
        url,
      });

      track('success');
      return { url, res };
    } catch (err) {
      // There's nothing to do here, so just keep going.
      // eslint-disable-line no-empty
    }
  }

  // If we get here, no urls could be loaded.
  track('error');
  throw new Error('Could not load any url');
};
