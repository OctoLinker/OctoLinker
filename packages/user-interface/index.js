import './style.css';

export const showNotification = ({ body, type = 'info', id = 'common' }) => {
  const typeClass = {
    info: 'flash-info',
    warn: 'flash-warn',
    error: 'flash-error',
  };

  const el = document.createElement('div');
  el.innerHTML = `<div class="js-octolinker-flash flash flash-full ${typeClass[type]}">
    <div class="container">
      <button class="octolinker-flash-close flash-close js-flash-close js-flash-close-${id}" type="button" aria-label="Dismiss this message">
        <svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg>
      </button>
       <div class="octolinker-flash-image"></div>
       <div class="octolinker-flash-content">
        ${body}
       </div>
    </div>
  </div>`;

  document.getElementById('js-flash-container').append(el);

  return el;
};

export const removeAllNotifications = () => {
  document
    .querySelectorAll('.js-octolinker-flash')
    .forEach((el) => el.remove());
};

export const isPrivateRepository = () => !!document.querySelector('h1.private');
