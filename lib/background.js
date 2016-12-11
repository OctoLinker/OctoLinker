import $ from 'jquery';
import * as storage from './options/storage.js';

function initGoogleAnalytics() {
  if (!storage.get('doTrack')) {
    return;
  }

  /* eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /* eslint-enable */

  window.ga('create', 'UA-88792224-1', 'auto');
  window.ga('set', 'anonymizeIp', true);
  window.ga('set', 'checkProtocolTask', () => {}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
}

function trackEvent({ category, action, label, value }) {
  if (!window.ga) {
    return;
  }
  window.ga('send', 'event', category, action, label, value);
}

function loader(urls, cb) {
  const { url, method = 'HEAD' } = urls.shift();

  $.ajax({
    method,
    url,
  }).then((res) => {
    trackEvent({
      category: 'fetch',
      action: 'success',
    });

    cb(null, url, res);
  }).fail(() => {
    if (urls.length === 0) {
      trackEvent({
        category: 'fetch',
        action: 'error',
      });

      return cb(new Error('Could not load any url'));
    }

    loader(urls, cb);
  });
}

chrome.runtime.onMessage.addListener(({ type, payload }, sender) => {
  if (type === 'track') {
    trackEvent(payload);
    return;
  }

  if (type === 'fetch') {
    loader(payload, (err, url, res) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        err,
        url,
        res,
      });
    });
    return;
  }

  throw new Error(`Can not handle type "${type}"`);
});

storage.load(() => {
  initGoogleAnalytics();
});
