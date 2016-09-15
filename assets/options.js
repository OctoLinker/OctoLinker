// Saves options to chrome.storage.local.
function saveOptions() {
  const customDomain = document.getElementById('customDomain').value;
  chrome.storage.local.set({
    customDomain,
  }, function () {
  });
}

// Restores state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Use default value customDomain = ''
  chrome.storage.local.get({
    customDomain: '',
  }, function (items) {
    document.getElementById('customDomain').value = items.customDomain;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('customDomain').addEventListener('blur',
    saveOptions);
