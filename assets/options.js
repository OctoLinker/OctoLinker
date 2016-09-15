// Saves options to chrome.storage.local.
function save_options() {
  var customDomain = document.getElementById('customDomain').value;
  chrome.storage.local.set({
    customDomain: customDomain,
  }, function() {
  });
}

// Restores state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value customDomain = ''
  chrome.storage.local.get({
    customDomain: '',
  }, function(items) {
    document.getElementById('customDomain').value = items.customDomain;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('customDomain').addEventListener('blur',
    save_options);
