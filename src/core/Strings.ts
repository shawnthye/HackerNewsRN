export default class Strings {
  static findHostname(url: string): string {
    return url?.replace('https://', '').replace('http://', '').split('/')?.[0];
  }
}
