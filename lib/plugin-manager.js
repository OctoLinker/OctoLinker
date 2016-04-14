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

export default class {
  constructor(plugins) {
    this._plugins = buildPluginCache(plugins);
  }

  get(filepath) {
    return flattenAndCompact([
      getPluginsForExt(this._plugins, filepath),
      getPluginsForFilename(this._plugins, filepath),
    ]);
  }
}
