import * as storage from '@octolinker/helper-settings';

const CLASS_NAME = 'octolinker-link';

let tid = null;

function updateCounter() {
  const stats = storage.get('stats') || {
    since: Date.now(),
    counter: 0,
  };

  storage.set('stats', {
    ...stats,
    counter: stats.counter + 1,
  });
}

function init() {
  function statsHandler(event) {
    if (!event.target.classList.contains(CLASS_NAME)) {
      return;
    }

    if (tid) clearTimeout(tid);

    tid = setTimeout(updateCounter, 1000);
  }

  document.body.addEventListener('click', statsHandler);
  document.body.addEventListener('mouseover', statsHandler);
}

init();
