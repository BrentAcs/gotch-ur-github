// TODO: Determine best practice was of handling this. a 'shared' folder on the root for models?
export class AppUser {
  constructor(
    public name: string = '',
    public accessToken: string = '',
    public secretKey: string = '',
    public persistSecretKey: boolean = false
  ) {
  }

  reset() {
    this.name = '';
    this.accessToken = '';
    this.secretKey = '';
    this.persistSecretKey = false;
  }

  // TODO: Is there a better best practice for this?
  static NAME_KEY = 'appuser-name';
  static ACCESS_TOKEN_KEY = 'appuser-access-token';
  static SECRET_KEY = 'appuser-secret-key';
  static PERSIST_SECRET_KEY = 'appuser-persist-secret-key';
}
