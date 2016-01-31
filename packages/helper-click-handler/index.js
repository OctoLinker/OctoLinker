import $ from 'jquery';
import { CLASS_NAME } from '../helper-wrap-element';

const LINK_SELECTOR = `.${CLASS_NAME}`;
const $body = $('body');
const listeners = new Map();

function clickHandler(event) {
  const dataAttr = event.target.dataset;
  const handlerFunc = listeners.get(dataAttr.type);

  if (handlerFunc) {
    handlerFunc(dataAttr);
  }
}

export function registerHandler(type, func) {
  if (listeners.has(type)) {
    return;
  }

  listeners.set(type, func);
}

function init() {
  $body.delegate(LINK_SELECTOR, 'click', clickHandler);
}

function cleanup() {
  $body.undelegate(LINK_SELECTOR, 'click', clickHandler);
  listeners.clear();
}

export default function () {
  cleanup();
  init();
}
