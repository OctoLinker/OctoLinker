import { extname } from 'path';

const supportedTypes = {
  '.js': 'javascript',
  '.es6': 'javascript',
  '.jsx': 'javascript',
  '.coffee': 'javascript',
};

export default function(filepath) {
  return supportedTypes[extname(filepath)];
}
