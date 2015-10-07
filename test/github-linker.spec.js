import assert from 'assert';
import githubLinker from '../src/github-linker.js';

describe('githubLinker', () => {
  it('test1', () => {
    assert.equal(githubLinker(), 'Hello');
  });
});
