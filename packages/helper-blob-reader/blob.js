import { getPath, getType, readLines } from './helper';

export default class Blob {
  constructor(el) {
    const path = getPath(el);

    if (!path) {
      return;
    }

    this.el = el;
    this.path = path;
    this.type = getType(this.path);
    this.lines = readLines(el);
  }
}
