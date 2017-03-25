import components from './components';
import * as storage from './storage';
import { options } from './options';

const formEl = document.querySelector('#options');

storage.load().then(() => {
  options.forEach((item) => {
    formEl.innerHTML += components({
      ...item,
      value: storage.get(item.name),
    });
  });
});

formEl.addEventListener('change', ({ target }) => {
  const tag = target.tagName.toLowerCase();

  if (tag === 'input' && target.type === 'checkbox') {
    storage.set(target.name, target.checked);
  } else {
    storage.set(target.name, target.value);
  }
});
