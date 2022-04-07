import TimeAgo from 'javascript-time-ago';

export default class Strings {
  static findHostname(url: string | undefined): string | undefined {
    return url?.replace('https://', '').replace('http://', '').split('/')?.[0];
  }

  static fromTimestamp(timestamp: number): string {
    const timeAgo = new TimeAgo('en-US');
    const date = new Date(timestamp * 1000);
    const ago = timeAgo.format(date);
    return `${ago}`;
  }
}
