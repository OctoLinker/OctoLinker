import { getPath, readLines } from './helper';

export default class Blob {
  constructor(el) {
    this.el = el;
    this.path = getPath(el);
    this.lines = readLines(el);
  }

  toString() {
    return this.lines.map(({ value }) => value).join('\n');
  }

  toJSON() {
    try {
      return JSON.parse(this.toString());
    } catch (err) {
      return {};
    }
  }
}
