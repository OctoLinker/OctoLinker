import resolver from '../index';

describe('resolver-github-shorthand', () => {
  test.each([['https://github.com/foo/bar'], ['github:foo/bar']])(
    'resolves "%s" to https://github.com/foo/bar',
    (target) => {
      expect(resolver({ target })).toEqual('https://github.com/foo/bar');
    },
  );
});
