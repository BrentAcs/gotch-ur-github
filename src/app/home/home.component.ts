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

  appUser: AppUser = {
    name: '',
    accessToken: '',
    secretKey: '',
    persistSecretKey: false,
  };

  constructor() {}

  // TODO: Determine if/how best practice for storing secret key
  ngOnInit(): void {
    this.loadAppUser();
  }

  onSubmit() {
    this.saveAppUser();
  }

  // TODO: Finish user persistance, need to work on clear functionality

  onClearUser(){
    this.homeForm.reset();
    //this.saveAppUser();
  }

  private loadAppUser() {
    this.appUser.name = LocalStorageService.getItem('appuser-name');
    this.appUser.persistSecretKey = JSON.parse(
      LocalStorageService.getItem('appuser-persist-secret-key')
    );
    const encryptedSecretKey = LocalStorageService.getItem(
      'appuser-secret-key'
    );
    if (this.appUser.name && encryptedSecretKey) {
      this.appUser.secretKey = CryptoService.decryptAES(
        encryptedSecretKey,
        this.appUser.name
      );
    }
    const encryptedAccessToken = LocalStorageService.getItem(
      'appuser-access-token'
    );
    if (this.appUser.secretKey && encryptedAccessToken) {
      this.appUser.accessToken = CryptoService.decryptAES(
        encryptedAccessToken,
        this.appUser.secretKey
      );
    }
  }

  private saveAppUser() {
    LocalStorageService.setItem('appuser-name', this.appUser.name);
    LocalStorageService.setItem(
      'appuser-persist-secret-key',
      this.appUser.persistSecretKey.toString()
    );
    if (this.appUser.accessToken && this.appUser.secretKey) {
      const encryptedAccessToken = CryptoService.encryptAES(
        this.appUser.accessToken,
        this.appUser.secretKey
      );
      LocalStorageService.setItem('appuser-access-token', encryptedAccessToken);
    } else {
      console.log('NOT persisting access token.');
    }
    if (this.appUser.secretKey && this.appUser.persistSecretKey) {
      const encryptedSecretKey = CryptoService.encryptAES(
        this.appUser.secretKey,
        this.appUser.name
      );
      LocalStorageService.setItem('appuser-secret-key', encryptedSecretKey);
    } else {
      console.log('NOT persisting secret key.');
    }
  }
}

// TODO: Determine best practice was of handling this.
class AppUser {
  name: string;
  accessToken: string;
  secretKey: string;
  persistSecretKey: boolean;
}
