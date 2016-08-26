function isList(element) {
  return element.includes(document.getElementById('octolinker_domainName').value);
}

function saveDomain(event) {
  chrome.storage.sync.get(['octoLinkerDomains'], function(items) {
    if (!items.octoLinkerDomains.find(isList)) {
      items.octoLinkerDomains.push(document.getElementById('octolinker_domainName').value);
      chrome.storage.sync.set({'octoLinkerDomains': items.octoLinkerDomains}, function() {});  
    }
  });
}
document.getElementById('octolinker_save').addEventListener('click', saveDomain);
