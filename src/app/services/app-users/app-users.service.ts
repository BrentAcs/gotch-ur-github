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

  selectedAppUser: AppUser = null;
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

  getAppUser(appUserId: string) {
    const appUser = this.appUsers.find((e) => {
      return e.id === appUserId;
    });
    return appUser;
  }

  readAppUsers() {
    return this._firestore
      .collection(this.appUserCollectionName)
      .snapshotChanges();
  }

  updateAppUser(appUserId: string, appUser: AppUser) {
    console.log('Updating user w/ Id: ' + appUserId);

    if (!appUserId) {
      throw new Error('Failed updating user, no id specified');
    }

    const encrypedUser = AppUser.encrypt(appUser);
    const obj = JSON.parse(JSON.stringify(encrypedUser));
    delete obj.id;
    return this._firestore
      .doc<AppUser>(this.appUserCollectionName + '/' + appUserId)
      .update(obj);
  }

  deleteAppUser(appUserId: string) {
    // console.log('Deleting user w/ Id: ' + appUserId);
    return this._firestore
      .doc(this.appUserCollectionName + '/' + appUserId)
      .delete();
  }
}
