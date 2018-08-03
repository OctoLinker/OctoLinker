import ghParse from 'github-url-parse';
import { getPath, readLines, getParentSha } from './helper';

async function fetchRaw({ user, repo, branch, path }) {
  const response = await fetch(
    `https://raw.githubusercontent.com/${user}/${repo}/${branch}/${path}`,
  );

  const raw = await response.text();
  return raw
    .split('\n')
    .map((value, lineNumber) => ({ value, lineNumber: lineNumber + 1 }));
}

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

  async fetchBlob() {
    const { user, repo, branch, path } = ghParse(
      `https://github.com${this.path}`,
    );
    this.lines = await fetchRaw({ user, repo, branch, path });
  }
}
