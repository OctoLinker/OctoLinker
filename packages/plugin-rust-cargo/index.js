import liveResolverQuery from '@octolinker/resolver-live-query';
import * as TOML from '@iarna/toml';
import insertLink from '@octolinker/helper-insert-link';
import { tomlRegExKeyValue } from '@octolinker/helper-regex-builder';

function linkDependency(blob, key, value) {
  const regex = tomlRegExKeyValue(key, value);
  return insertLink(blob, regex, this);
}

function processTOML(blob, plugin, config) {
  let results = [];
  const json = TOML.parse(blob.toString());
  const toml = TOML.stringify(json.dependencies).split('\n');

  toml.forEach(line => {
    const match = /^([^=\s]+)\s*=\s*"([^"\s]+)"$/.exec(line);

    if (match) {
      const linked = linkDependency.call(plugin, blob, match[1], match[2]);

      results = results.concat(linked);
    }
  });

  return results;
}

export default {
  name: 'Rust Cargo',

  resolve(path, values, { type }) {
    return liveResolverQuery({ type: 'crates', target: values[0] });
  },

  getPattern() {
    return {
      pathRegexes: [/cargo\.toml/i],
    };
  },

  parseBlob(blob) {
    return processTOML(blob, this);
  },
};
