import {generateNextPageToken} from './generateNextPageToken';

describe('generateNextPageToken', () => {
  it('is has next page', () => {
    expect(generateNextPageToken(100, 99, 10)).toStrictEqual({
      start: 99,
      end: 100,
    });
  });

  it('the end', () => {
    expect(generateNextPageToken(100, 100, 10)).toBe(undefined);
  });
});
