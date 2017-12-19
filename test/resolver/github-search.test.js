import assert from 'assert';
import githubSearch from '../../lib/resolver/github-search.js';

describe('github-search', () => {
  const path = '/octo/foo.txt';
  const target = 'bar.txt';

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  it('returns a function', () => {
    assert.deepEqual(typeof githubSearch({ path, target }), 'function');
  });

  it('calls the github search api', () => {
    githubSearch({ path, target })();

    expect(global.fetch).toBeCalledWith(
      'https://api.github.com/search/code?q=bar.txt+in:path+filename:bar.txt+repo:octo/foo.txt+extension:.txt',
    );
  });

  it('does not append query param "extension" when target does not have a file extension', () => {
    githubSearch({ path, target: 'bar' })();

    expect(global.fetch).toBeCalledWith(
      'https://api.github.com/search/code?q=bar+in:path+filename:bar+repo:octo/foo.txt',
    );
  });
});
