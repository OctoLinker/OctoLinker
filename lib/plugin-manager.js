import { extname, basename } from 'path';
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

  plugins.forEach((PluginClass) => {
    const plugin = new PluginClass();

    plugin.getPattern().pathSubstrings.forEach((pattern) => {
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

function getPluginsForExt(plugins, filepath) {
  return plugins.get(extname(filepath));
}

function getPluginsForFilename(plugins, filepath) {
  return plugins.get(basename(filepath));
}

function getPluginsForGithubClasses(plugins, classList) {
  return flattenAndCompact(Array.from(classList).map((className) => plugins.get(className) || []));
}

export default class {
  constructor(plugins) {
    this._pluginClasses = plugins;
    this._plugins = buildPluginCache(plugins);
  }

  get(blob) {
    const filepath = blob.path;
    const filepathPlugins = flattenAndCompact([
      getPluginsForExt(this._plugins, filepath),
      getPluginsForFilename(this._plugins, filepath),
    ]);
    if (filepathPlugins.length) {
      return filepathPlugins;
    }
    // if we didn't find any plugins by inspecting the file path,
    // resort to class-based detection
    return getPluginsForGithubClasses(this._plugins, blob.el.classList);
  }
}
