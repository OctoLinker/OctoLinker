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
import resolverTrustedUrl from '@octolinker/resolver-trusted-url';

function linkDependency(blob, key, value) {
  const isValidSemver = isSemver(value) || value === 'latest';
  const regex = jsonRegExKeyValue(key, value);

  return insertLink(blob, regex, this, {
    type: isValidSemver ? 'liveResolverQuery' : 'git',
  });
}

function linkFile(blob, key, value) {
  if (typeof value !== 'string') {
    return;
  }

  const regex = jsonRegExValue(key, value);
  return insertLink(blob, regex, this, { type: 'file' });
}

export default {
  name: 'NpmManifest',
  needsContext: true,

  resolve(path, values, { type }) {
    if (type === 'file') {
      return javascriptFile({ target: values[0], path });
    }

    if (type === 'liveResolverQuery') {
      return liveResolverQuery({ type: 'npm', target: values[0] });
    }

    if (values.length === 1) {
      // Return early if right hand side is not given
      // This happens when the RegExp does not match anything
      return [];
    }

    return [
      githubShorthand({ target: values[1] }),
      gitUrl({ target: values[1] }),
    ].map((url) => url && resolverTrustedUrl({ target: url }));
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
