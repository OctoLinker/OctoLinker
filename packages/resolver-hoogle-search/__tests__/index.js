import assert from 'assert';
import { hoogleSearch, handleResponse } from '../index';

describe('hoogle-search', () => {
  const target = 'Data.Typeable';

  beforeAll(() => {
    global.fetch = jest.fn();
  });

  it('returns a function', () => {
    assert.deepEqual(typeof hoogleSearch({ target }), 'function');
  });

  it('calls the hoogle search api', () => {
    hoogleSearch({ target })();

    expect(global.fetch).toBeCalledWith(
      'https://hoogle.haskell.org/?hoogle=Data.Typeable%20is:module%20is:exact&mode=json',
    );
  });

  it('returns null when no results', () => {
    assert.equal(handleResponse('url', 'target', []), null);
  });
});
