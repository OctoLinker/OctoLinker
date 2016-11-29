import $ from 'jquery';

function loader(urls, cb) {
  const { url, method = 'HEAD' } = urls.shift();

  $.ajax({
    method,
    url,
  }).then((res) => {
    cb(null, url, res);
  }).fail(() => {
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
