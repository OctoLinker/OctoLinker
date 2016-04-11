import LinkResolver from './plugins/link-resolver';
import ManifestNPM from './plugins/manifest-npm';
import ManifestGemfile from './plugins/manifest-gemfile';

const plugins = [
  LinkResolver,
  ManifestNPM,
  ManifestGemfile,
];

function generateCache() {
  const list = new Map();

  plugins.forEach((PluginClass) => {
    const pluginInstance = new PluginClass();

    pluginInstance.blobTypes().forEach((type) => {
      const caller = list.get(type) || [];
      caller.push(pluginInstance);

      if (!list.has(type)) {
        list.set(type, caller);
      }
    });
  });

  return list;
}

const cache = generateCache();

export default function (pluginName) {
  return cache.get(pluginName);
}
