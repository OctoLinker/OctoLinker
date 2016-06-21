import $ from 'jquery';

export function showTooltip($target, msg) {
  if (!$target.hasClass('tooltipped')) {
    $target.addClass('tooltipped tooltipped-e');
  }

  $target.attr('aria-label', msg);
}

function getUserName() {
  const el = window.document.querySelector('.header .css-truncate-target');
  if (el && el.textContent.length) {
    return ' ' + el.textContent;
  }
  return '';
}

export function showNotification() {
  const username = getUserName();

  const html = `<div class="flash flash-full">
    <div class="container">
      <button class="flash-close js-flash-close" type="button" aria-label="Dismiss this message">
        <svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg>
      </button>
      <strong>Hello${username},</strong><br>
      A new version of the OctoLinker extension has been released! — <a href="https://github.com/OctoLinker/browser-extension/releases" target="_blank">Read more</a>
    </div>
  </div>`;

  $('#js-flash-container').append(html);
}
