import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppUser } from '../../shared/app-user.model';

@Injectable({
  providedIn: 'root',
})
// TODO: Determine if/how best practice for storing secret key
export class AppUsersService {
  readonly appUserCollectionName = 'app-users';

  selectedAppUser: AppUser = new AppUser();
  selectedAppUserChanged = new Subject<AppUser>();
  appUsers: AppUser[] = [];

  constructor(private _firestors: AngularFirestore) {}

  createAppUser() {
    console.log('creating app user in service');
    console.log(this.selectedAppUser);

    if (!this.selectedAppUser) {
      throw new Error('App Users Service has no selected app user.');
    }

    if (!this.selectedAppUser.id) {
      this.selectedAppUser.id = this._firestors.createId();
    }

    const obj = JSON.parse(JSON.stringify(this.selectedAppUser));
    return this._firestors.collection(this.appUserCollectionName).add(obj);
  }

  readAppUsers() {
    return this._firestors
      .collection(this.appUserCollectionName)
      .snapshotChanges();
  }

  load() {
    console.log('app-users.service # load');

    return this.readAppUsers();

    // this.readAppUsers().subscribe((data) => {
    //   this.appUsers = data.map((ele) => {
    //     const appUser = {
    //       id: ele.payload.doc.id,
    //       // for 'as {}', see: https://stackoverflow.com/questions/51189388/typescript-spread-types-may-only-be-created-from-object-types/51193091
    //       ...(ele.payload.doc.data() as {}),
    //     } as AppUser;

    //     console.log('mapping app user');
    //     return appUser;
    //   });
    // });

    // console.log('user app service, app users: ');
    // console.log(this.appUsers);
  }

  save() {
    console.log('app-users.service # save');

    // LocalStorageService.setItem(AppUser.NAME_KEY, this.appUser.name);
    // let persistSecretKey = 'false';
    // if (this.appUser.persistSecretKey) {
    //   persistSecretKey = this.appUser.persistSecretKey.toString();
    // }
    // // LocalStorageService.setItem(
    // //   AppUser.USE_ACCESS_TOKEN_KEY,
    // //   this.appUser.useAccessToken.toString()
    // // );
    // LocalStorageService.setItem(AppUser.PERSIST_SECRET_KEY, persistSecretKey);
    // if (this.appUser.accessToken && this.appUser.secretKey) {
    //   const encryptedAccessToken = CryptoService.encryptAES(
    //     this.appUser.accessToken,
    //     this.appUser.secretKey
    //   );
    //   LocalStorageService.setItem(
    //     AppUser.ACCESS_TOKEN_KEY,
    //     encryptedAccessToken
    //   );
    // } else {
    //   console.warn('NOT persisting access token.');
    // }
    // if (this.appUser.secretKey && this.appUser.persistSecretKey) {
    //   const encryptedSecretKey = CryptoService.encryptAES(
    //     this.appUser.secretKey,
    //     this.appUser.name
    //   );
    //   LocalStorageService.setItem(AppUser.SECRET_KEY, encryptedSecretKey);
    // } else {
    //   console.warn('NOT persisting secret key.');
    // }
  }

  // TODO: Finish user persistance, need to work on clear/secure functionality
  clear() {
    console.log('app-users.service # load');

    // this.appUser.reset();
    // LocalStorageService.setItem(AppUser.NAME_KEY, this.appUser.name);
    // LocalStorageService.setItem(
    //   AppUser.ACCESS_TOKEN_KEY,
    //   this.appUser.accessToken
    // );
    // // LocalStorageService.setItem(
    // //   AppUser.USE_ACCESS_TOKEN_KEY,
    // //   this.appUser.useAccessToken.toString()
    // // );
    // LocalStorageService.setItem(AppUser.SECRET_KEY, this.appUser.secretKey);
    // LocalStorageService.setItem(
    //   AppUser.PERSIST_SECRET_KEY,
    //   this.appUser.persistSecretKey.toString()
    // );
    // this.appUserChanged.next(this.appUser);
  }
}
