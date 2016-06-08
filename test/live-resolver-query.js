import assert from 'assert';
import liveResolverQuery from '../lib/resolver/live-resolver-query.js';

describe('live-resolver-query', () => {
  it("(npm) treats 'foo/bar.js' like 'foo'", () => {
    const type = 'npm';
    assert.deepEqual(
      liveResolverQuery({type, target: 'foo/bar.js'}),
      liveResolverQuery({type, target: 'foo'})
    );
  });
});
