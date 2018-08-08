import helperProcessJson from '../index';

describe('helper-process-json', () => {
  let plugin;
  let blob;
  let config;
  let json;

  beforeEach(() => {
    plugin = jest.fn();
    json = {
      dependencies: 'foo',
    };
    blob = {
      toJSON: jest.fn().mockReturnValue(json),
    };
    config = {
      '$.dependencies': jest.fn().mockReturnValue('callbackValue'),
      '$.noMatch': jest.fn(),
    };
  });

  it('does not call callback when xPath does not match', () => {
    helperProcessJson(blob, plugin, config);
    expect(config['$.noMatch']).not.toBeCalled();
  });

  it('calls callback when xPath match', () => {
    const result = helperProcessJson(blob, plugin, config);
    expect(config['$.dependencies']).toBeCalledWith(
      blob,
      'dependencies',
      'foo',
    );

    expect(result).toEqual(['callbackValue']);
  });

  it('calls callback on nested json object', () => {
    json = {
      devDependencies: {
        foo: 'bar',
        baz: 'qux',
      },
    };
    config = {
      '$.devDependencies': jest.fn(),
    };
    blob = {
      toJSON: jest.fn().mockReturnValue(json),
    };

    helperProcessJson(blob, plugin, config);
    expect(config['$.devDependencies']).toHaveBeenNthCalledWith(
      1,
      blob,
      'foo',
      'bar',
    );
    expect(config['$.devDependencies']).toHaveBeenNthCalledWith(
      2,
      blob,
      'baz',
      'qux',
    );
  });

  it('runs xPath on parent blob and the actual blob and returns both results', () => {
    const parentJson = {
      dependencies: 'bar',
    };
    const parentBlob = {
      toJSON: jest.fn().mockReturnValue(parentJson),
    };
    blob.parent = parentBlob;

    const result = helperProcessJson(blob, plugin, config);
    expect(config['$.dependencies']).toHaveBeenNthCalledWith(
      2,
      parentBlob,
      'dependencies',
      'bar',
    );

    expect(result).toEqual(['callbackValue', 'callbackValue']);
  });
});
