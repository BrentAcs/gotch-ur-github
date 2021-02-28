import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { pipe } from 'rxjs';

import { AppUser } from 'src/app/shared/app-user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseClientService {
  //  TODO:  remove class/file from project.

  // appUserList: AngularFireList<AppUser> = null;
  // readonly appUserCollectionName = 'app-users';
  // //  _appUsers = null;

  // // constructor(private db: AngularFireDatabase) {
  // //   this.appUserList = db.list(this.dbPath);
  // // }

  // constructor(private _fs: AngularFirestore){
  //   // TODO: this might not be the best place, but it's a start
  //   // this._appUsers = _fs.collection(this.appUserCollectionName).snapshotChanges();
  //   // console.log('this._appUsers');
  //   // console.log(this._appUsers);
  // }

  // createAppUser(appUser: AppUser){
  //   return this._fs.collection(this.appUserCollectionName).add(appUser);
  // }

  // readAppUsers(){
  //   return this._fs.collection(this.appUserCollectionName).snapshotChanges;
  // }

  // updateAppUser(appUser: AppUser){
  //   delete appUser.id;
  //   this._fs.doc(this.appUserCollectionName + '/' + appUser.id ).update(appUser);
  // }

  // deleteAppUser(appUserId: string){
  //   this._fs.doc(this.appUserCollectionName + '/' + appUserId).delete();
  // }
}
