import wrapElement from '../helper-wrap-element';

const blockStartRegex = /"(d|devD|peerD|optionalD)ependencies":\s?{/;
const blockInnerRegex = /"[^"\s]+"/;
const blockEndRegex = /}/;

const nameRegex = /"name": ("[^"\s]+")/;

let insideBlock = false;

function keywordFromMatch(match) {
  return {
    [++match.index]: match[0].replace(/['|"]/g, ''),
  };
}

function blockStart(item) {
  return item.text.match(blockStartRegex);
}

function blockEnd(item) {
  return item.text.match(blockEndRegex);
}

function blockInner(item, options) {
  const found = item.text.match(blockInnerRegex);
  if (found) {
    wrapElement(item.el, keywordFromMatch(found), options);
  }
}

function block(item, options) {
  if (blockEnd(item)) {
    insideBlock = false;
  }

  if (insideBlock) {
    blockInner(item, options);
  }

  if (blockStart(item)) {
    insideBlock = true;
  }
}

function blober(blob, options) {
  if (!blob.path.endsWith('package.json')) {
    return;
  }

  blob.lines.forEach((item) => {
    block(item, options);

    const nameMatch = item.text.match(nameRegex);
    if (nameMatch) {
      wrapElement(item.el, keywordFromMatch(nameMatch), options);
    }
  });
}

function main(blobs, options = { debug: false }) {
  blobs.forEach((blob) => {
    blober(blob, options);
  });
}

export {
  main as default,
};
