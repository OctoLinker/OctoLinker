import { DOCKER_FROM } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';

export default class Docker {

  getPattern() {
    return ['Dockerfile'];
  }

  parseBlob(blob) {
    insertLink(blob.el, DOCKER_FROM, {
      resolver: 'dockerImage',
      image: '$1',
    });
  }
}
