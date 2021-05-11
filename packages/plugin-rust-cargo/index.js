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
  // target.*.[dependencies|dev-dependencies|build-dependencies]
  // https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html
  let targets = {};
  Object.entries(json["target"]).forEach(([_, obj]) => {
    targets = Object.assign(
      obj["dependencies"],
      obj["dev-dependencies"],
      obj['build-dependencies']
    );
  })

  const entries = Object.assign(
    json['dependencies'],
    json['dev-dependencies'],
    json['build-dependencies'],
    targets
  );

  Object.entries(entries).forEach(([name, value]) => {
    const version = typeof value === "string" ? value : value.version;
    // filter entries don't have version
    if (!version) return;

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
