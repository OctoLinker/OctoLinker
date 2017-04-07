import { DOCKER_FROM } from '../../packages/helper-grammar-regex-collection/index.js';
import insertLink from '../insert-link';

export default class Docker {

  static resolve({ target }) {
    let isOffical = true;
    const imageName = target.split(':')[0];

    if (target.includes('/')) {
      isOffical = false;
    }

    return [
      `https://hub.docker.com/${isOffical ? '_' : 'r'}/${imageName}`,
    ];
  }

  static getPattern() {
    return {
      pathPatterns: ['/Dockerfile$'],
      githubClasses: [
        'type-dockerfile',
        'highlight-source-dockerfile',
      ],
    };
  }

  parseBlob(blob) {
    insertLink(blob.el, DOCKER_FROM, {
      pluginName: this.constructor.name,
      target: '$1',
    });
  }
}
