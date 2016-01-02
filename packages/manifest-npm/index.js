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

function blockInner(item) {
  const found = item.text.match(blockInnerRegex);
  if (found) {
    wrapElement(item.el, keywordFromMatch(found));
  }
}

function block(item) {
  if (blockEnd(item)) {
    insideBlock = false;
  }

  if (insideBlock) {
    blockInner(item);
  }

  if (blockStart(item)) {
    insideBlock = true;
  }
}

function blober(blob) {
  if (!blob.path.endsWith('package.json')) {
    return;
  }

  blob.lines.forEach((item) => {
    block(item);

    const nameMatch = item.text.match(nameRegex);
    if (nameMatch) {
      wrapElement(item.el, keywordFromMatch(nameMatch));
    }
  });
}

export default function(blobs) {
  blobs.forEach(blober);
}
