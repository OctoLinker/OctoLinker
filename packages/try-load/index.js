import $ from 'jquery';

let callback;
let urls;
let url;

function thenHandler(res) {
  callback(null, url, res);
}

function failHandler() {
  if (urls.length === 0) {
    return callback(new Error('Could not load any url'));
  }

  loader(urls, callback); // eslint-disable-line no-use-before-define
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.err) {
    failHandler();
  } else {
    thenHandler(msg.body);
  }
});

export default function loader(urls2, cb) {
  callback = cb;
  urls = urls2;

  const req = urls.shift();
  url = req.url || req;

  if (!url.startsWith('https://github.com')) {
    chrome.runtime.sendMessage({
      method: req.method || 'HEAD',
      url,
    });

    return;
  }

  $.ajax({
    method: req.method || 'HEAD',
    url,
  })
    .then(thenHandler)
    .fail(failHandler);
}
