import { flattenAndCompact } from './utils/array';

function updatePluginsForKey(lookup, plugin, key) {
  const pluginsForKey = lookup.get(key) || [];

  if (pluginsForKey.includes(plugin)) {
    return;
  }

  pluginsForKey.push(plugin);

  if (lookup.has(key)) {
    return;
  }

  lookup.set(key, pluginsForKey);
}

function buildPluginCache(plugins) {
  const lookup = new Map();

  plugins.forEach((plugin) => {
    plugin.getPattern().pathRegexes.forEach((pattern) => {
      updatePluginsForKey(lookup, plugin, pattern);
    });

    if (!plugin.getPattern().githubClasses) {
      return;
    }

    plugin.getPattern().githubClasses.forEach((githubClass) => {
      updatePluginsForKey(lookup, plugin, githubClass);
    });
  });

  return lookup;
}

function getPluginsForPath(plugins, filepath) {
  let results = [];
  for (const [key, value] of plugins) {
    if (key instanceof RegExp && key.test(filepath)) {
      results = results.concat(value);
    }
  }
  return results;
}

function getPluginsForGithubClasses(plugins, classList) {
  return flattenAndCompact(
    Array.from(classList).map(plugins.get.bind(plugins)),
  );
}

export default class {
  constructor(plugins) {
    plugins = Object.values(plugins);
    this._plugins = buildPluginCache(plugins);
  }

  get(filepath, classList) {
    const filepathPlugins = flattenAndCompact([
      getPluginsForPath(this._plugins, filepath),
    ]);
    if (filepathPlugins.length) {
      return filepathPlugins;
    }
    // if we didn't find any plugins by inspecting the file path,
    // resort to class-based detection
    return getPluginsForGithubClasses(this._plugins, classList);
  }
}
