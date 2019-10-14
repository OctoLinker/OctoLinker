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
      this.lines.filter(({ side }) => ['left', 'right'].includes(side)).length >
      0;
    this.firstLineNumber = this.isDiff
      ? parseInt(
          el.querySelector('tr:nth-child(2n) [data-line-number]').dataset
            .lineNumber,
          10,
        )
      : 1;
  }

  toString(type = null) {
    let filterFunc = () => true;

    // Diff left side
    if (type === 'left') {
      filterFunc = ({ side }) => ['left', 'context'].includes(side);
    }
    // Diff right side
    if (type === 'right') {
      filterFunc = ({ side }) => ['right', 'context'].includes(side);
    }
    return this.lines
      .filter(filterFunc)
      .map(({ value }) => value)
      .join('\n');
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

  async fetchParentBlob() {
    const { user, repo, path } = ghParse(`https://github.com${this.path}`);
    const branch = getParentSha();

    this.parent = new Blob(this.el);
    this.parent.lines = await fetchRaw({ user, repo, branch, path });
  }
}
