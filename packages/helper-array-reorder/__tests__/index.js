import sortResolveUrls from '../index';

describe('reorder-helper', () => {
  it('keeps the order when reordering list is empty', () => {
    expect(sortResolveUrls(['a', 'b', 'c'], [])).toEqual(['a', 'b', 'c']);
  });
  it('keeps the order when reordering list contains invalid array index', () => {
    expect(sortResolveUrls(['a', 'b', 'c'], [4])).toEqual(['a', 'b', 'c']);
  });
  it('pushes b to the beginning', () => {
    expect(sortResolveUrls(['a', 'b', 'c'], [1])).toEqual(['b', 'a', 'c']);
  });

  it('pushes c to the beginning', () => {
    expect(sortResolveUrls(['a', 'b', 'c'], [2])).toEqual(['c', 'a', 'b']);
  });

  it('pushes c followed by b to the beginning', () => {
    expect(sortResolveUrls(['a', 'b', 'c'], [2, 1])).toEqual(['c', 'b', 'a']);
  });
  it('reorders the list according to their reordering index', () => {
    expect(sortResolveUrls(['a', 'b', 'c'], [2, 1, 0])).toEqual([
      'c',
      'b',
      'a',
    ]);
  });
});
