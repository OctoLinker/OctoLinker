import './style.css';

export const showNotification = ({
  body,
  clickHandler = () => {},
  type = 'info',
  id = 'common',
}) => {
  const typeClass = {
    info: 'Toast--info',
    success: 'Toast--success',
    warn: 'Toast--warning',
    error: 'Toast--error',
  };

  const icons = {
    info: '<svg style="pointer-events: none;" class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm6.5-.25A.75.75 0 017.25 7h1a.75.75 0 01.75.75v2.75h.25a.75.75 0 010 1.5h-2a.75.75 0 010-1.5h.25v-2h-.25a.75.75 0 01-.75-.75zM8 6a1 1 0 100-2 1 1 0 000 2z"></path></svg>',
    success:
      '<svg style="pointer-events: none;" class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>',
    warn: '<svg style="pointer-events: none;" class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path></svg>',
    error:
      '<svg style="pointer-events: none;" class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 0110.535-5.096l-9.131 9.131A6.472 6.472 0 011.5 8zm2.465 5.096a6.5 6.5 0 009.131-9.131l-9.131 9.131zM8 0a8 8 0 100 16A8 8 0 008 0z"></path></svg>',
  };

  const el = document.createElement('div');
  el.innerHTML = `<div class="position-fixed bottom-0 left-0 ml-5 mb-5 anim-fade-in fast js-octolinker-toast octolinker-toast Toast ${typeClass[type]}" role="log" style="z-index: 101;">
    <span class="Toast-icon">
        ${icons[type]}
    </span>
    <span class="Toast-content">
      <div class="octo-toast-image"></div>
      ${body}
    </span>
      <button class="Toast-dismissButton" type="button" aria-label="Close">
        <svg aria-hidden="true" class="octicon octicon-x" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
      </button>
  </div>`;

  document.body.append(el);
  el.addEventListener('click', (event) => {
    if (['a', 'button'].includes(event.target.nodeName.toLowerCase())) {
      clickHandler(event);
      el.remove();
    }
  });
};

export const isPrivateRepository = () => {
  const privateLabel = document.querySelector('h1 > .Label');
  return !!privateLabel && privateLabel.textContent === 'Private';
};
