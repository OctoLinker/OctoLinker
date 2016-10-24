import builtins from 'builtins';

const docs = builtins.reduce((result, builtin) => {
  let filename = builtin;
  if (filename === 'module') {
    filename = 'modules';
  }
  result[builtin] = `https://nodejs.org/api/${filename}.html`;
  return result;
}, {});

export default docs;
