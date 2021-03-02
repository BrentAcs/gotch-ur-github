export class AppSettings {
  constructor(public usePublicApi = false) {}

  reset() {
    this.usePublicApi = false;
  }

  static USE_PUBLIC_API = 'appsettings-use-public-api';
}
