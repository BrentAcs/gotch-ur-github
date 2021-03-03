import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

import { AppUser } from '../../shared/app-user.model';
import { LoggingService } from '../logging-service/logging.service';

@Injectable({
  providedIn: 'root',
})
// TODO: Determine if/how best practice for storing secret key
export class AppUsersService {
  // Helpful resources:
  //  https://www.techiediaries.com/angular-10-firebase-database-crud/
  //  https://dottedsquirrel.com/firebase/how-to-create-and-read-things-in-firebase/

  readonly appUserCollectionName = 'app-users';

  selectedAppUser: AppUser = null; // = new AppUser();
  selectedAppUserChanged = new Subject<AppUser>();
  appUsers: AppUser[] = [];

  constructor(private _firestore: AngularFirestore) {}

  createAppUser(newAppUser: AppUser) {
    console.log('creating app user in service');

    const encrypedUser = AppUser.encrypt(newAppUser);
    const obj = JSON.parse(JSON.stringify(encrypedUser));
    delete obj.id;
    this.selectedAppUser = newAppUser;
    return this._firestore.collection(this.appUserCollectionName).add(obj);
  }

  readAppUsers() {
    return this._firestore
      .collection(this.appUserCollectionName)
      .snapshotChanges();
  }

  updateAppUser() {
    //   delete appUser.id;
    //   this._fs.doc(this.appUserCollectionName + '/' + appUser.id ).update(appUser);
  }

  deleteAppUser() {
    const appUserId = this.selectedAppUser.id;
    this.selectedAppUser = new AppUser();
    return this._firestore
      .doc(this.appUserCollectionName + '/' + appUserId)
      .delete();
  }

  load() {
    return this.readAppUsers();
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
