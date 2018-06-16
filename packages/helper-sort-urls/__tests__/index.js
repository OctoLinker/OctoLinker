import helperSortUrls from '../index';

describe('helper-sort-urls', () => {
  let urls;

  beforeEach(() => {
    urls = [
      'foo.js',
      'foo.json',
      'foo/bar.json',
      'foo/bar.js',
      'foo/bar/baz.json',
      'foo/bar/baz.js',
    ];
  });

  it('reorders urls when file extension is present', () => {
    expect(helperSortUrls(urls, 'file.json')).toEqual([
      'foo.json',
      'foo/bar.json',
      'foo/bar/baz.json',
      'foo.js',
      'foo/bar.js',
      'foo/bar/baz.js',
    ]);
  });

  it('keeps order when file does not have a file extension', () => {
    expect(helperSortUrls(urls, 'file')).toEqual(urls);
  });

  it('keeps order when file extension is not present', () => {
    expect(helperSortUrls(urls, 'file.txt')).toEqual(urls);
  });
});
