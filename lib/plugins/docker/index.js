import { DOCKER_FROM } from '../../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../../insert-link';
import preset from '../../pattern-preset';

export default class Docker {

  getPattern() {
    return preset('Docker');
  }

  parseBlob(blob) {
    insertLink(blob.el, DOCKER_FROM, {
      resolver: 'dockerImage',
      image: '$1',
    });
  }
}
