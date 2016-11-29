const customDomainField = document.getElementById('customDomain');

// Saves options to chrome.storage.local.
function saveOptions() {
  chrome.storage.local.set({
    customDomain: customDomainField.value,
  }, function () {
  });
}

// Restores state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  // Use default value customDomain = ''
  chrome.storage.local.get({
    customDomain: '',
  }, function ({ customDomain }) {
    customDomainField.value = customDomain;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
customDomainField.addEventListener('blur', saveOptions);
