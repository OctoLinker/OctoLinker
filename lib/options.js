document.getElementById('add').addEventListener('click', function () {
  const url = document.getElementById('url').value;

  chrome.permissions.request({
    permissions: ['declarativeContent'],
    origins: [`${url}*`],
  }, function (granted) {
    if (!granted) {
      return;
    }

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { urlMatches: `${url}` },
        })],
        actions: [
          new chrome.declarativeContent.RequestContentScript({
            js: ['app.js'],
            css: ['style.css'],
          }),
        ],
      }]);
    });
  });
});
