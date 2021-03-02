import { CryptoService } from '../services/crypto/crypto.service';

// TODO: Determine best practice was of handling this. a 'shared' folder on the root for models?
export class AppUser {
  id = null;

  // TODO: remove 'useAccessToken' and add a 'Use Public API' to header for calls.
  constructor(
    public name = '',
    public accessToken = '',
    // public useAccessToken = false,
    public secretKey = '',
    public persistSecretKey = false
  ) {}

  toObject() {
    return {
      id: this.id,
      name: this.name,
      accessToken: this.accessToken,
      // useAccessToken: this.useAccessToken,
      secretKey: this.secretKey,
      persistSecretKey: this.persistSecretKey,
    };
  }

  reset() {
    this.id = null;
    this.name = '';
    this.accessToken = '';
    // this.useAccessToken = false;
    this.secretKey = '';
    this.persistSecretKey = false;
  }

  static encrypt(appUser: AppUser) {
    let newAppUser = new AppUser();

    newAppUser.name = appUser.name;
    // newAppUser.useAccessToken = appUser.useAccessToken;
    newAppUser.persistSecretKey = appUser.persistSecretKey;
    if (appUser.accessToken?.length > 0) {
      newAppUser.accessToken = CryptoService.encryptAES(
        appUser.accessToken,
        appUser.secretKey
      );
    }
    if (appUser.persistSecretKey) {
      newAppUser.secretKey = CryptoService.encryptAES(
        appUser.secretKey,
        appUser.name
      );
    }

    return newAppUser;
  }

  static decrypt(appUser: AppUser) {
    let newAppUser = new AppUser();

    newAppUser.id = appUser.id;
    newAppUser.name = appUser.name;
    // newAppUser.useAccessToken = appUser.useAccessToken;
    newAppUser.persistSecretKey = appUser.persistSecretKey;
    if (appUser.secretKey?.length > 0) {
      newAppUser.secretKey = CryptoService.decryptAES(
        appUser.secretKey,
        appUser.name
      );
    }
    if (appUser.accessToken?.length > 0 && newAppUser.secretKey.length > 0) {
      newAppUser.accessToken = CryptoService.decryptAES(
        appUser.accessToken,
        newAppUser.secretKey
      );
    }

    return newAppUser;
  }
}
