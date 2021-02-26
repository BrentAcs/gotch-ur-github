export class AppSettings {
  constructor(public useAccessToken = false) {}

  reset() {
    this.useAccessToken = false;
  }

  // TODO: Is there a better best practice for this?
  static USE_ACCESS_TOKEN_KEY = 'appsettings-use-access-token';
}
