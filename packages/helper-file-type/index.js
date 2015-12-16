import {extname} from 'path';

var supportedTypes = {
  '.js': 'javascript',
  '.es6': 'javascript',
  '.jsx': 'javascript',
  '.coffee': 'javascript',
};

export default function(filepath) {
  return supportedTypes[extname(filepath)];
}
