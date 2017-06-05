import insertLink from '../insert-link';
import nugetResolver from '../resolver/nuget';
import { xmlRegExKeyValue } from './helper/regex-builder';

function linkDependency(blob, key, value) {
  const regex = xmlRegExKeyValue(key, value);

  insertLink(blob.el, regex, {
    pluginName: 'DotNet',
    target: '$1',
  });
}

export default {
  name: 'DotNet',

  resolve({ target }) {
    return nugetResolver({ target });
  },

  getPattern() {
    return {
      pathPatterns: ['/packages.config$'],
      githubClasses: [],
    };
  },

  parseBlob(blob) {
    const packageRegex = new RegExp('<\\s*package\\s.*id="(.*?)".*\\/>', 'g');
    const blobString = blob.toString();
    let matches = packageRegex.exec(blobString);
    while (matches !== null) {
      linkDependency(blob, 'id', matches[1]);
      matches = packageRegex.exec(blobString);
    }
  },
};
