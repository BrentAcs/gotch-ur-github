import { Component, OnInit, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { CryptoService } from '../services/crypto/crypto.service';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('f') homeForm: NgForm;

  appUser: AppUser = new AppUser();

  // appUser: AppUser = {
  //   name: '',
  //   accessToken: '',
  //   secretKey: '',
  //   persistSecretKey: false,
  // };

  constructor() {}

  // TODO: Determine if/how best practice for storing secret key
  ngOnInit(): void {
    this.loadAppUser();
  }

  onSubmit() {
    this.saveAppUser();
  }

  // TODO: Finish user persistance, need to work on clear/secure functionality
  onClearUser() {
    this.appUser.reset();
    LocalStorageService.setItem(AppUser.NAME_KEY, this.appUser.name);
    LocalStorageService.setItem(AppUser.ACCESS_TOKEN_KEY, this.appUser.accessToken);
    LocalStorageService.setItem(AppUser.SECRET_KEY, this.appUser.secretKey);
    LocalStorageService.setItem(AppUser.PERSIST_SECRET_KEY,this.appUser.persistSecretKey.toString());
  }

  private loadAppUser() {
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
  }

  private saveAppUser() {
    LocalStorageService.setItem(AppUser.NAME_KEY, this.appUser.name);
    let persistSecretKey = 'false';
    if (this.appUser.persistSecretKey) {
      persistSecretKey = this.appUser.persistSecretKey.toString();
    }
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
}

// TODO: Determine best practice was of handling this. a 'shared' folder on the root for models?
class AppUser {
  name: string;
  accessToken: string;
  secretKey: string;
  persistSecretKey: boolean;

  constructor() {
    this.reset();
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
