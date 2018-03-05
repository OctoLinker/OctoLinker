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

  return insertLink(blob, regex, this, {
    type: isValidSemver ? 'liveResolverQuery' : 'git',
  });
}

function linkFile(blob, key, value) {
  const regex = jsonRegExValue(key, value);
  return insertLink(blob, regex, this, { type: 'file' });
}

export default {
  name: 'NpmManifest',

  resolve(path, values, { type }) {
    if (type === 'file') {
      return javascriptFile({ target: values[0], path });
    }

    if (type === 'liveResolverQuery') {
      return liveResolverQuery({ type: 'npm', target: values[0] });
    }

    return [
      githubShorthand({ target: values[1] }),
      gitUrl({ target: values[1] }),
    ];
  },

  getPattern() {
    return {
      pathRegexes: [/package\.json$/],
      githubClasses: [],
    };
  },

  parseBlob(blob) {
    return processJSON(blob, this, {
      '$.dependencies': linkDependency,
      '$.devDependencies': linkDependency,
      '$.peerDependencies': linkDependency,
      '$.optionalDependencies': linkDependency,
      '$.main': linkFile,
      '$.module': linkFile,
      '$.jsnext:main': linkFile,
      '$.bin': linkFile,
      '$.browser': linkFile,
      '$.typings': linkFile,
      '$.types': linkFile,
    });
  },
};
