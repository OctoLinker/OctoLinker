
function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        if (xhr.response) {
          return resolve(JSON.parse(xhr.response));
        }

        resolve();
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };

    xhr.send();
  });
}

chrome.runtime.onMessage.addListener(({ method, url }, sender) => {
  makeRequest(method, url)
    .then((body) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        err: null,
        body,
      });
    })
    .catch((err) => {
      chrome.tabs.sendMessage(sender.tab.id, {
        err,
      });
    });
});
