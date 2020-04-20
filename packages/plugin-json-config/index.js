import insertLink from '@octolinker/helper-insert-link';
import processJSON from '@octolinker/helper-process-json';
import {
  jsonRegExValue,
  jsonRegExArrayValue,
} from '@octolinker/helper-regex-builder';
import liveResolverQuery from '@octolinker/resolver-live-query';

function linkDependency(blob, key, value) {
  let regex;

  if (Number.isNaN(key)) {
    regex = jsonRegExValue(key, value, true);
  } else {
    regex = jsonRegExArrayValue(value);
  }

  return insertLink(blob, regex, this);
}

export default {
  name: 'JsonConfig',
  needsContext: true,

  resolve(path, values) {
    return liveResolverQuery({ type: 'npm', target: values[0] });
  },

  getPattern() {
    return {
      pathRegexes: [
        /\.babelrc\.json$/,
        /babel\.config\.json$/,
        /\.stylelintrc\.json$/,
        /tsconfig\.json$/,
        /package\.json$/,
      ],
      githubClasses: [],
    };
  },

  parseBlob(blob) {
    return processJSON(blob, this, {
      '$.extends': linkDependency,
      '$.presets': linkDependency,
      '$.plugins': linkDependency,
      '$.stylelintConfig': linkDependency,
    });
  },
};
