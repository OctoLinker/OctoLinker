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

    (plugin.getPattern().pathSubstrings || plugin.getPattern()).forEach((pattern) => {
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
  return flattenAndCompact(Array.from(classList).map(plugins.get.bind(plugins)));
}

export default class {
  constructor(plugins) {
    this._pluginsList = plugins;
    this._plugins = buildPluginCache(plugins);
  }

  getResolver(pluginName) {
    const plugin = this._pluginsList.find(pluginClass => pluginClass.name === pluginName);

    if (!plugin) {
      console.error(`Plugin ${pluginName} not found`);  // eslint-disable-line no-console
      return;
    }

    if (!plugin.resolve) {
      console.error(`No resolve found for ${pluginName}`);  // eslint-disable-line no-console
      return;
    }

    return plugin.resolve;
  }

  get(filepath, classList) {
    const filepathPlugins = flattenAndCompact([
      getPluginsForExt(this._plugins, filepath),
      getPluginsForFilename(this._plugins, filepath),
    ]);
    if (filepathPlugins.length) {
      return filepathPlugins;
    }
    // if we didn't find any plugins by inspecting the file path,
    // resort to class-based detection
    return getPluginsForGithubClasses(this._plugins, classList);
  }
}
