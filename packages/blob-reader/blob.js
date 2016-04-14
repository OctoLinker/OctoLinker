import { getPath, readLines } from './helper';

export default class Blob {
  constructor(el) {
    const path = getPath(el);

    if (!path) {
      return;
    }

    this.el = el;
    this.path = path;
    this.lines = readLines(el);
  }

  getText() {
    return this.lines.map(({ value }) => value).join('\n');
  }

  getJSON() {
    try {
      return JSON.parse(this.getText());
    } catch (err) {
      console.error(err);
      return {};
    }
  }
}
