function initGoogleAnalytics(trackingCode, doTrack) {
  if (!doTrack) {
    return;
  }

  /* eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  /* eslint-enable */

  window.ga('create', 'UA-88792224-2', 'auto');
  window.ga('set', 'anonymizeIp', true);
  window.ga('set', 'checkProtocolTask', () => {}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
}

function trackEvent({ category, action, label, value }) {
  if (!window.ga) {
    return;
  }
  window.ga('send', 'event', category, action, label, value);
}

export default (trackingCode, doTrack) => {
  initGoogleAnalytics(trackingCode, doTrack);

  chrome.runtime.onMessage.addListener(({ type, payload }) => {
    if (type !== 'track') return;

    trackEvent(payload);
  });
};
