import jsonPath from 'JSONPath';

export default function (blob, config) {
  const json = blob.toJSON();

  Object.entries(config).map(([path, linker]) => {
    const jsonResult = jsonPath({ json, path, resultType: 'all' });
    const result = jsonResult[0];

    if (!result) {
      return undefined;
    }

    if (typeof result.value === 'string') {
      return linker(blob, result.parentProperty, result.value);
    }

    for (const node of jsonResult) {
      for (const [key, value] of Object.entries(node.value)) {
        linker(blob, key, value);
      }
    }
  });
}
