import * as TOML from '@iarna/toml';
import insertLink from '@octolinker/helper-insert-link';
import { tomlRegExKeyValue } from '@octolinker/helper-regex-builder';
import liveResolverQuery from '@octolinker/resolver-live-query';

function linkDependency(blob, key, value) {
  const regex = tomlRegExKeyValue(key, value);
  return insertLink(blob, regex, this);
}

function processTOML(blob, plugin) {
  let results = [];
  const json = TOML.parse(blob.toString());

  Object.entries(json.dependencies).forEach(([name, version]) => {
    const linked = linkDependency.call(plugin, blob, name, version);

    results = results.concat(linked);
  });

  return results;
}

export default {
  name: 'RustCargo',
  needsContext: true,

  resolve(path, values) {
    return liveResolverQuery({ type: 'crates', target: values[0] });
  },

  getPattern() {
    return {
      pathRegexes: [/cargo\.toml/i],
      githubClasses: [],
    };
  },

  parseBlob(blob) {
    return processTOML(blob, this);
  },
};
