import { DOCKER_FROM } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';
import preset from '../pattern-preset';

export default class Docker {

  static resolve({ image }) {
    let isOffical = true;
    const imageName = image.split(':')[0];

    if (image.includes('/')) {
      isOffical = false;
    }

    return [
      `https://hub.docker.com/${isOffical ? '_' : 'r'}/${imageName}`,
    ];
  }

  getPattern() {
    return preset('Docker');
  }

  parseBlob(blob) {
    insertLink(blob.el, DOCKER_FROM, {
      pluginName: this.constructor.name,
      image: '$1',
    });
  }
}
