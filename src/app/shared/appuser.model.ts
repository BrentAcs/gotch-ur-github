// TODO: Determine best practice was of handling this. a 'shared' folder on the root for models?
export class AppUser {
  constructor(
    public name = '',
    public accessToken = '',
    public useAccessToken = false,
    public secretKey = '',
    public persistSecretKey = false
  ) {
  }

  reset() {
    this.name = '';
    this.accessToken = '';
    this.useAccessToken = false;
    this.secretKey = '';
    this.persistSecretKey = false;
  }

  // TODO: Is there a better best practice for this?
  static NAME_KEY = 'appuser-name';
  static ACCESS_TOKEN_KEY = 'appuser-access-token';
  static USE_ACCESS_TOKEN_KEY = 'appuser-use-access-token';
  static SECRET_KEY = 'appuser-secret-key';
  static PERSIST_SECRET_KEY = 'appuser-persist-secret-key';
}
