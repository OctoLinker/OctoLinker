const customDomainField = document.getElementById('customDomain');

// Saves options to chrome.storage.local.
function saveOptions() {
  const customDomain = customDomainField.value;
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
    customDomainField.value = items.customDomain;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
customDomainField.addEventListener('blur',
    saveOptions);
