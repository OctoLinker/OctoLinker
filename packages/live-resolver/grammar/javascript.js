export default {
  requireRegex: /require(?:.resolve)?\(['"]([^'"]+)['"]\);?/g,
  importRegex: /\bimport\s+(?:.+\s+from\s+)?[\'"]([^"\']+)["\']/g,
};
