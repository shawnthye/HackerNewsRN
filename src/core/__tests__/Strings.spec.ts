import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import Strings from '../Strings';

export {};

beforeAll(() => {
  TimeAgo.addDefaultLocale(en);
  TimeAgo.setDefaultLocale('en-US');
});

describe('Strings', () => {
  it('correct hostname', () => {
    expect(Strings.findHostname('https://google.com')).toBe('google.com');
    expect(Strings.findHostname('https://www.google.com')).toBe(
      'www.google.com',
    );
    expect(Strings.findHostname('http://google.com')).toBe('google.com');
  });

  it('timestamp string', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    expect(Strings.fromTimestamp(yesterday.getTime() / 1000)).toBe('1 day ago');
  });
});
