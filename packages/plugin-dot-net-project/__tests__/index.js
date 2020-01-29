import dotNetProject from '../index';

describe('dotNetProject', () => {
  const path = '/blob/path/dummy';

  it('resolves ../proj/proj.csproj to {BASE_URL}', () => {
    expect(dotNetProject.resolve(path, ['../../proj/proj.csproj'])).toEqual(
      '{BASE_URL}/proj/proj.csproj',
    );
  });
});
