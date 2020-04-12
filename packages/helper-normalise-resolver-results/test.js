import normaliseResolverResults from './index.js';

describe('normaliseResolverResults', () => {
  test.each([
    '{BASE_URL}file.js',
    '{BASE_URL}/file.js',
    '{BASE_URL}/foo/bar/blob/master/file.js',
    '{BASE_URL}/foo/bar/blob/1ab8cfd3b65d3b43335130d6cefbf8c62482680f/file.js',
    'https://foosearch.org/',
    'https://novalidurl',
    ['{BASE_URL}/foo/bar/blob/master/file.js'],
    [
      '{BASE_URL}/foo/bar/blob/master/file.js',
      '{BASE_URL}/foo/bar/blob/master/file.js',
    ],
    { registry: 'npm', target: 'foo' },
    () => {},
  ])('converts %s', (url) => {
    expect(normaliseResolverResults([].concat(url))).toMatchSnapshot();
  });
});
