import jsonPath from 'JSONPath';

export default function(blob, config) {
  const json = blob.toJSON();

  let results = [];

  Object.entries(config).forEach(([path, linker]) => {
    jsonPath({ json, path, resultType: 'all' }).forEach(result => {
      if (typeof result.value === 'string') {
        results = results.concat(
          linker(blob, result.parentProperty, result.value),
        );
        return;
      }

      for (const [key, value] of Object.entries(result.value)) {
        results = results.concat(linker(blob, key, value));
      }
    });
  });

  return results;
}
