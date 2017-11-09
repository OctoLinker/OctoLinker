import { JAVA_IMPORT } from '../../packages/helper-grammar-regex-collection/index.js';

const SUPPORTED_JAVA_VERSIONS = [9, 8, 7];

export default {
  name: 'Java',

  resolve({ target }) {
    const targetAsPath = target.replace(/\./g, '/');

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
