import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AppUser } from '../../shared/appuser.model';
import { CryptoService } from '../crypto/crypto.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
// TODO: Determine if/how best practice for storing secret key
export class AppUserService {
  appUser: AppUser = new AppUser();
  appUserChanged = new Subject<AppUser>();

  constructor() {}

  load() {
    this.appUser.name = LocalStorageService.getItem(AppUser.NAME_KEY);
    this.appUser.persistSecretKey = JSON.parse(
      LocalStorageService.getItem(AppUser.PERSIST_SECRET_KEY)
    );
    const encryptedSecretKey = LocalStorageService.getItem(AppUser.SECRET_KEY);
    if (this.appUser.name && encryptedSecretKey) {
      this.appUser.secretKey = CryptoService.decryptAES(
        encryptedSecretKey,
        this.appUser.name
      );
    }
    const encryptedAccessToken = LocalStorageService.getItem(
      AppUser.ACCESS_TOKEN_KEY
    );
    if (this.appUser.secretKey && encryptedAccessToken) {
      this.appUser.accessToken = CryptoService.decryptAES(
        encryptedAccessToken,
        this.appUser.secretKey
      );
    }
    this.appUser.useAccessToken = JSON.parse(
      LocalStorageService.getItem(AppUser.USE_ACCESS_TOKEN_KEY)
    );
    this.appUserChanged.next(this.appUser);
  }

  save() {
    LocalStorageService.setItem(AppUser.NAME_KEY, this.appUser.name);
    let persistSecretKey = 'false';
    if (this.appUser.persistSecretKey) {
      persistSecretKey = this.appUser.persistSecretKey.toString();
    }
    LocalStorageService.setItem(
      AppUser.USE_ACCESS_TOKEN_KEY,
      this.appUser.useAccessToken.toString()
    );
    LocalStorageService.setItem(AppUser.PERSIST_SECRET_KEY, persistSecretKey);
    if (this.appUser.accessToken && this.appUser.secretKey) {
      const encryptedAccessToken = CryptoService.encryptAES(
        this.appUser.accessToken,
        this.appUser.secretKey
      );
      LocalStorageService.setItem(
        AppUser.ACCESS_TOKEN_KEY,
        encryptedAccessToken
      );
    } else {
      console.log('NOT persisting access token.');
    }
    if (this.appUser.secretKey && this.appUser.persistSecretKey) {
      const encryptedSecretKey = CryptoService.encryptAES(
        this.appUser.secretKey,
        this.appUser.name
      );
      LocalStorageService.setItem(AppUser.SECRET_KEY, encryptedSecretKey);
    } else {
      console.log('NOT persisting secret key.');
    }
  }

  // TODO: Finish user persistance, need to work on clear/secure functionality
  clear() {
    this.appUser.reset();
    LocalStorageService.setItem(AppUser.NAME_KEY, this.appUser.name);
    LocalStorageService.setItem(
      AppUser.ACCESS_TOKEN_KEY,
      this.appUser.accessToken
    );
    LocalStorageService.setItem(
      AppUser.USE_ACCESS_TOKEN_KEY,
      this.appUser.useAccessToken.toString()
    );
    LocalStorageService.setItem(AppUser.SECRET_KEY, this.appUser.secretKey);
    LocalStorageService.setItem(
      AppUser.PERSIST_SECRET_KEY,
      this.appUser.persistSecretKey.toString()
    );
    this.appUserChanged.next(this.appUser);
  }
}
