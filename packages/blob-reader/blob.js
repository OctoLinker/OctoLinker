import ghParse from 'github-url-parse';

async function fetchRaw({ user, repo, ref, path }) {
  const response = await fetch(
    `https://raw.githubusercontent.com/${user}/${repo}/${ref}/${path}`,
  );

  if (response.status >= 400) {
    return [];
  }

  const raw = await response.text();
  return raw
    .split('\n')
    .map((value, lineNumber) => ({ value, lineNumber: lineNumber + 1 }));
}

export default class Blob {
  constructor({ el, path, lines, blobType, branch = undefined }) {
    this.el = el;
    this.path = path;
    this.lines = lines;
    this.branch = branch;
    this.blobType = blobType; // one of: diffLeft, diffRight, snippet, full
  }

  lineSelector(lineNumber) {
    if (this.isDiff) {
      const side = this.blobType === 'diffLeft' ? 'L' : 'R';

      // The double selector is needed to avoid situations where the first line
      // is the chunk information like: @@ -0,0 +1 @@
      return `[id$='${side}${lineNumber}'][data-line-number='${lineNumber}']`;
    }

    if (this.blobType === 'snippet') {
      return 'pre';
    }

    return `#LC${lineNumber}`;
  }

  get isDiff() {
    return ['diffLeft', 'diffRight'].includes(this.blobType);
  }

  toString() {
    return this.lines.map(({ value }) => value).join('\n');
  }

  get firstLineNumber() {
    return this.lines[0].lineNumber;
  }

  toJSON() {
    try {
      return JSON.parse(this.toString());
    } catch (err) {
      return {};
    }
  }

  async fetchBlob() {
    // TODO try to avoid request if blob is alreay fully repsrent
    const { user, repo, branch, path } = ghParse(
      `https://github.com${this.path}`,
    );
    this.lines = await fetchRaw({
      user,
      repo,
      ref: this.branch || branch, // this.branch is given when blobType is diffLeft
      path,
    });
  }
}
