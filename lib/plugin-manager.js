import { extname, basename } from 'path';
import { flattenAndCompact } from './utils/array';

function buildPluginCache(plugins) {
  const lookup = new Map();

  plugins.forEach((PluginClass) => {
    const plugin = new PluginClass();

    plugin.getPattern().forEach((pattern) => {
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
  });

  return lookup;
}

function getPluginsForExt(plugins, filepath) {
  return plugins.get(extname(filepath));
}

function getPluginsForFilename(plugins, filepath) {
  return plugins.get(basename(filepath));
}

function getPluginsForShebang(pluginClasses, blob) {
  // TODO add tests for all this
  return flattenAndCompact(pluginClasses.map((PluginClass) => {
    const plugin = new PluginClass();
    if (!plugin.getShebangPattern) {
      return [];
    }
    if (!blob.lines.length) {
      return [];
    }
    if (plugin.getShebangPattern().test(blob.lines[0].value)) {
      return [plugin];
    }
    return [];
  }));
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
    // resort to shebang-based detection
    return getPluginsForShebang(this._pluginClasses, blob);
  }
}
