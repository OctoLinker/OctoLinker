import $ from 'jquery';

function loader(urls, cb) {
  const req = urls.shift();
  const url = req.url || req;

  $.ajax({
    method: req.method || 'HEAD',
    url,
  }).then(function (res) {
    cb(null, url, res);
  }).fail(function () {
    if (urls.length === 0) {
      return cb(new Error('Could not load any url'));
    }

    loader(urls, cb);
  });
}

chrome.runtime.onMessage.addListener(({ urls }, sender) => {
  loader(urls, (err, url, res) => {
    chrome.tabs.sendMessage(sender.tab.id, {
      err,
      url,
      res,
    });
  });
});
