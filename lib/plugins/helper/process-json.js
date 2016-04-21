import jsonPath from 'JSONPath';

export default function (blob, config) {
  const json = blob.getJSON();

  Object.entries(config).map(([path, linker]) => {
    const result = jsonPath({ json, path, resultType: 'all' })[0];

    if (!result) {
      return undefined;
    }

    if (typeof result.value === 'string') {
      return linker(blob, result.parentProperty, result.value);
    }

    for (const [key, value] of Object.entries(result.value)) {
      linker(blob, key, value);
    }
  });
}
