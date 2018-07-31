import { getPath, readLines } from './helper';

export default class Blob {
  constructor(el) {
    this.el = el;
    this.path = getPath(el);
    this.lines = readLines(el);
    this.isDiff =
      this.lines.filter(line => line.addition || line.deletion).length > 0;
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
