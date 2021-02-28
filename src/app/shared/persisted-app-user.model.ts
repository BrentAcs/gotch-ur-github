import { CryptoService } from '../services/crypto/crypto.service';
import { AppUser } from './app-user.model';

export class PersistedAppUser extends AppUser {
  static toPersisted(appUser: AppUser) {
    console.warn('move this to AppUser and call it "encrypt"');
    let persistedUser = new PersistedAppUser();

    persistedUser.name = appUser.name;
    persistedUser.useAccessToken = appUser.useAccessToken;
    persistedUser.persistSecretKey = appUser.persistSecretKey;
    if (appUser.accessToken?.length > 0) {
      persistedUser.accessToken = CryptoService.encryptAES(
        appUser.accessToken,
        appUser.secretKey
      );
    }
    if (appUser.persistSecretKey) {
      persistedUser.secretKey = CryptoService.encryptAES(
        appUser.secretKey,
        appUser.name
      );
    }

    return persistedUser;
  }

  static fromPersisted(persistedUser: PersistedAppUser) {
    console.warn('move this to AppUser and call it "decrypt"');
    let appUser = new AppUser();

    appUser.name = persistedUser.name;
    appUser.useAccessToken = persistedUser.useAccessToken;
    appUser.persistSecretKey = persistedUser.persistSecretKey;
    if (persistedUser.secretKey?.length > 0) {
      appUser.secretKey = CryptoService.decryptAES(
        persistedUser.secretKey,
        persistedUser.name
      );
    }
    if (persistedUser.accessToken?.length > 0 && appUser.secretKey.length > 0) {
      appUser.accessToken = CryptoService.decryptAES(
        persistedUser.accessToken,
        appUser.secretKey
      );
    }

    return appUser;
  }
}
