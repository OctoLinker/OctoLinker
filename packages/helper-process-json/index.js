import jsonPath from 'JSONPath';

export default function (blob, plugin, config) {
  let results = [];
  const json = blob.toJSON();
  Object.entries(config).forEach(([path, linker]) => {
    jsonPath({ json, path, resultType: 'all' }).forEach((result) => {
      if (typeof result.value === 'string') {
        results = results.concat(
          linker.call(plugin, blob, result.parentProperty, result.value),
        );
        return;
      }

      for (const [key, value] of Object.entries(result.value)) {
        results = results.concat(linker.call(plugin, blob, key, value));
      }
    });
  });

  return results;
}
