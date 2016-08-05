import { RUST_CRATE } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';

export default class Rust {

  getPattern() {
    return preset('Rust');
  }

  parseBlob(blob) {
    insertLink(blob.el, RUST_CRATE, {
      resolver: 'rustCrate',
      target: '$1',
    });
  }
}
