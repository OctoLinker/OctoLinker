import { getPath, readLines } from './helper';

export default class Blob {
  constructor(el) {
    this.el = el;
    this.path = getPath(el);
    this.lines = readLines(el);
  }

  getText() {
    return this.lines.map(({ value }) => value).join('\n');
  }

  getJSON() {
    try {
      return JSON.parse(this.getText());
    } catch (err) {
      return {};
    }
  }
}
