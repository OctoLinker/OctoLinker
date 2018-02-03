import insertLink from '@octolinker/helper-insert-link';
import processJSON from '@octolinker/helper-process-json';
import { isSemver } from '@octolinker/helper-version';
import { javascriptFile } from '@octolinker/plugin-javascript';
import {
  jsonRegExKeyValue,
  jsonRegExValue,
} from '@octolinker/helper-regex-builder';
import liveResolverQuery from '@octolinker/resolver-live-query';
import gitUrl from '@octolinker/resolver-git-url';
import githubShorthand from '@octolinker/resolver-github-shorthand';

function linkDependency(blob, key, value) {
  const isValidSemver = isSemver(value);
  const regex = jsonRegExKeyValue(key, value);

  return insertLink(blob.el, regex, {
    pluginName: 'BowerManifest',
    target: isValidSemver ? '$1' : '$2',
    type: isValidSemver ? 'liveResolverQuery' : 'git',
  });
}

function linkFile(blob, key, value) {
  const regex = jsonRegExValue(key, value);

  return insertLink(blob.el, regex, {
    pluginName: 'BowerManifest',
    type: 'file',
    path: blob.path,
    target: '$1',
  });
}

export default {
  name: 'BowerManifest',

  resolve({ target, path, type }) {
    if (type === 'file') {
      return javascriptFile({ target, path });
    }

    if (type === 'liveResolverQuery') {
      return liveResolverQuery({ type: 'bower', target });
    }

    return [gitUrl({ target }), githubShorthand({ target })];
  },

  getPattern() {
    return {
      pathRegexes: [/bower\.json$/],
      githubClasses: [],
    };
  },

  parseBlob(blob) {
    return processJSON(blob, {
      '$.dependencies': linkDependency,
      '$.devDependencies': linkDependency,
      '$.resolutions': linkDependency,
      '$.main': linkFile,
    });
  },
};
