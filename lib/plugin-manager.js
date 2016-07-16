import { extname, basename } from 'path';
import { flattenAndCompact } from './utils/array';

function buildPluginCache(plugins) {
  const lookup = new Map();

  plugins.forEach((PluginClass) => {
    const plugin = new PluginClass();

    plugin.getPattern().pathSubstrings.forEach((pattern) => {
      const pluginsForPattern = lookup.get(pattern) || [];

      if (pluginsForPattern.includes(plugin)) {
        return;
      }

      pluginsForPattern.push(plugin);

      if (lookup.has(pattern)) {
        return;
      }

      lookup.set(pattern, pluginsForPattern);
    });

    if (!plugin.getPattern().githubClass) {
      return;
    }

    [plugin.getPattern().githubClass].forEach((githubClass) => {
      const pluginsForGithubClass = lookup.get(githubClass) || [];

      if (pluginsForGithubClass.includes(plugin)) {
        return;
      }

      pluginsForGithubClass.push(plugin);

      if (lookup.has(githubClass)) {
        return;
      }

      lookup.set(githubClass, pluginsForGithubClass);
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
