import { NET_PROJ_FILE_REFERENCE } from '@octolinker/helper-grammar-regex-collection';
import relativeFile from '@octolinker/resolver-relative-file';

export default {
  name: 'DotNetProject',

  resolve(path, [target]) {
    // Both / and \ are supported as the path separator so we need to normalize it to /
    target = target.replace(/\\/g, '/');

    return relativeFile({ path, target });
  },

  getPattern() {
    return {
      pathRegexes: [/\.(cs|fs|vb)proj$/],
      githubClasses: [],
    };
  },

  getLinkRegexes() {
    return [NET_PROJ_FILE_REFERENCE];
  },
};
