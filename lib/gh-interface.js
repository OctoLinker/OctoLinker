
export function showTooltip($target, msg) {
  if (!$target.hasClass('tooltipped')) {
    $target.addClass('tooltipped tooltipped-e');
  }

  $target.attr('aria-label', msg);
}
