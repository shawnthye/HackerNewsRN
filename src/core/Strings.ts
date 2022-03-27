// const SECOND = 1000;
// const MINUTE = 60 * SECOND;
// const HOUR = 60 * MINUTE;
// const DAY = 24 * HOUR;

// const intervals = [
//   {ge: DAY, divisor: DAY, unit: 'day'},
//   {ge: HOUR, divisor: HOUR, unit: 'hour'},
//   {ge: MINUTE, divisor: MINUTE, unit: 'minute'},
//   {ge: 30 * SECOND, divisor: SECOND, unit: 'seconds'},
//   {ge: 0, divisor: 1, text: 'just now'},
// ];

export default class Strings {
  static findHostname(url: string | undefined): string | undefined {
    return url?.replace('https://', '').replace('http://', '').split('/')?.[0];
  }

  static fromTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);

    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
}
