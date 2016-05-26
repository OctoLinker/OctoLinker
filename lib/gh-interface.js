import $ from 'jquery';

export function showTooltip($target, msg) {
  if (!$target.hasClass('tooltipped')) {
    $target.addClass('tooltipped tooltipped-e');
  }

  $target.attr('aria-label', msg);
}

function getUserName() {
  const el = window.document.querySelector('.header .css-truncate-target');
  if (el && el.innerHTML.length) {
    return ' ' + el.innerHTML;
  }
  return '';
}

export function showNotification() {
  const username = getUserName();

  const html = `<div class="flash flash-full">
    <div class="container">
      <a href="https://github.com/OctoLinker/browser-extension/releases" class="btn btn-sm flash-action" target="_blank">Read more</a>
      <strong>Hello${username},</strong><br>
      A new version of the OctoLinker extension has been released!
    </div>
  </div>`;

  $('#js-flash-container').append(html);
}
