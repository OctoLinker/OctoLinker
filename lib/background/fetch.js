import $ from 'jquery';

const loader = (urls, cb) => {
  const { url, method = 'HEAD' } = urls.shift();

  $.ajax({
    method,
    url,
  }).then((res) => {
    chrome.runtime.sendMessage({
      type: 'track',
      payload: {
        category: 'fetch',
        action: 'success',
      },
    });

    cb(null, url, res);
  }).fail(() => {
    if (urls.length === 0) {
      chrome.runtime.sendMessage({
        type: 'track',
        payload: {
          category: 'fetch',
          action: 'error',
        },
      });

      return cb(new Error('Could not load any url'));
    }

    loader(urls, cb);
  });
};

export default () => {
  chrome.runtime.onMessage.addListener(({ type, payload }, sender) => {
    if (type !== 'fetch') return;

    loader(payload, (err, url, res) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        err,
        url,
        res,
      });
    });
  });
};
