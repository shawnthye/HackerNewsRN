export default class Strings {
  static findHostname(url: string | undefined): string | undefined {
    return url?.replace('https://', '').replace('http://', '').split('/')?.[0];
  }
}
