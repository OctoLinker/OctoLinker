import assert from 'assert';
import { hoogleSearch } from '../index';

describe('hoogle-search', () => {
  const target = 'Data.Typeable';
  let response;
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json() {
          return response;
        },
      }),
    );
  });

  it('returns a function', () => {
    assert.deepEqual(typeof hoogleSearch({ target }), 'function');
  });

  it('calls the hoogle search api', async () => {
    await hoogleSearch({ target })();

    expect(global.fetch).toBeCalledWith(
      'https://hoogle.haskell.org/?hoogle=Data.Typeable%20is:module%20is:exact&mode=json',
    );
  });

  it('returns url', async () => {
    response = [
      {
        url: 'https://hackage.haskell.org/package/base-4.11.1.0/docs/Data-Typeable.html',
      },
    ];

    expect(await hoogleSearch({ target })()).toBe(
      'https://hackage.haskell.org/package/base-4.11.1.0/docs/Data-Typeable.html',
    );
  });

  it('returns hoogle search page when search returns more than one result', async () => {
    response = [
      {
        url: 'https://hackage.haskell.org/package/base-4.11.1.0/docs/Data-Typeable.html',
      },
      {
        url: 'https://hackage.haskell.org/package/base-4.11.1.0/docs/Data-Typeable.html',
      },
    ];

    expect(await hoogleSearch({ target })()).toBe(
      'https://hoogle.haskell.org/?hoogle=Data.Typeable%20is:module%20is:exact',
    );
  });

  it('returns null when no results', async () => {
    response = [];

    expect(await hoogleSearch({ target })()).toBe(null);
  });
});
