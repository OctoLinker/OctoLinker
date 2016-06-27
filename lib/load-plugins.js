
// Load all plugins from /lib/plugins/*/index.js.
// For more information about dynamic require see
// https://webpack.github.io/docs/context.html

export default function loadPlugins() {
  function requireAll(requireContext) {
    return requireContext.keys().map((pluginPath) => {
      return requireContext(pluginPath).default;
    });
  }

  return requireAll(require.context('./plugins', true, /\/index\.js$/));
}
