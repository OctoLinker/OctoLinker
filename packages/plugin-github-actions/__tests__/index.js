import assert from 'assert';
import GiHubActions, { isWorkflowFile } from '../index';

describe('GiHubActions', () => {
  const target = 'foo/bar';

  it('resolves link when file is within .github/workflows', () => {
    assert.deepEqual(
      GiHubActions.resolve('/octo/cat/.github/workflows/dog.yml', [target]),
      '{BASE_URL}/foo/bar',
    );
  });

  it('resolves link with version when file is within .github/workflows', () => {
    assert.deepEqual(
      GiHubActions.resolve('/octo/cat/.github/workflows/dog.yml@v1', [
        target,
        'v1',
      ]),
      '{BASE_URL}/foo/bar/tree/v1',
    );
  });

  it('does not resolves link when file is not within .github/workflows', () => {
    assert.deepEqual(
      GiHubActions.resolve('/octo/cat/.github/dog.yml', [target]),
      '',
    );
  });
});

describe('isWorkflowFile', () => {
  it('matches on .github/workflows folder', () => {
    expect(
      isWorkflowFile('/OctoLinker/.github/blob/main/.github/workflows/ci.yml'),
    ).toBe(true);
  });

  it('matches on workflows-templates folder in .github repo', () => {
    expect(
      isWorkflowFile('/OctoLinker/.github/blob/main/workflow-templates/ci.yml'),
    ).toBe(true);
  });

  it("doesn't match on workflows-templates folder in non .github repo", () => {
    expect(
      isWorkflowFile(
        '/OctoLinker/OctoLinker/blob/main/workflow-templates/ci.yml',
      ),
    ).toBe(false);
  });

  it('matches with pinned version in url', () => {
    expect(
      isWorkflowFile(
        '/OctoLinker/.github/blob/main/.github/workflows/ci.yml@v3',
      ),
    ).toBe(true);
  });
});
