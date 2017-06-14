import jsonPath from 'JSONPath';

export default function (blob, config) {
  const json = blob.toJSON();

  Object.entries(config).forEach(([path, linker]) => {
    jsonPath({ json, path, resultType: 'all' }).forEach((result) => {
      if (typeof result.value === 'string') {
        return linker(blob, result.parentProperty, result.value);
      }

      for (const [key, value] of Object.entries(result.value)) {
        linker(blob, key, value);
      }
    });
  });
}
