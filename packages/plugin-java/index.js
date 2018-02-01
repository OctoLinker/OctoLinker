import { JAVA_IMPORT } from '@octolinker/helper-grammar-regex-collection';
import liveResolverQuery from '@octolinker/resolver-live-query';

const SUPPORTED_JAVA_VERSIONS = [9, 8, 7];

export default {
  name: 'Java',

  resolve({ target }) {
    const targetAsPath = target.replace(/\./g, '/');
    const isBuildIn = !!target.match(/^javax?/);

    if (!isBuildIn) {
      return liveResolverQuery({ type: 'java', target });
    }

    return SUPPORTED_JAVA_VERSIONS.reduce(
      (memo, version) =>
        memo.concat(
          `https://docs.oracle.com/javase/${version}/docs/api/${targetAsPath}.html`,
          `https://docs.oracle.com/javaee/${version}/api/${targetAsPath}.html`,
        ),
      [],
    );
  },

  getPattern() {
    return {
      pathRegexes: [/\.java$/],
      githubClasses: ['type-java', 'highlight-source-java'],
    };
  },

  getLinkRegexes() {
    return JAVA_IMPORT;
  },
};
