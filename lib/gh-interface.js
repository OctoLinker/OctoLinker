
export function showTooltip($target, msg) {
  if (!$target.hasClass('tooltipped')) {
    $target.addClass('tooltipped tooltipped-e');
  }

  $target.attr('aria-label', msg);
}

export function showNotification(message, headline = 'New Octo Linker improvements') {
  const containerEl = document.getElementById('js-flash-container');

  const html = `<div class="flash flash-full">
    <div class="container">
      <a href="https://octo-linker.github.io/" class="btn btn-sm flash-action">Read more</a>
      <strong>${headline}</strong><br>
      ${message}
    </div>
  </div>`;

  containerEl.insertAdjacentHTML('beforeend', html);
}
