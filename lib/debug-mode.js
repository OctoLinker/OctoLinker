export default function (enable = false) {
  if (!enable) {
    return;
  }

  document.body.classList.add('octo-linker-debug');
}
