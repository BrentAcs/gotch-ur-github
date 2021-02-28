import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { pipe } from 'rxjs';

import { AppUser } from 'src/app/shared/app-user.model';

// Helpful resources:
//  https://www.techiediaries.com/angular-10-firebase-database-crud/
//  https://dottedsquirrel.com/firebase/how-to-create-and-read-things-in-firebase/

@Injectable({
  providedIn: 'root',
})
export class FirebaseClientService {
  // appUserList: AngularFireList<AppUser> = null;
  readonly appUserCollectionName = 'app-users';
  //  _appUsers = null;

  // constructor(private db: AngularFireDatabase) {
  //   this.appUserList = db.list(this.dbPath);
  // }

  constructor(private _fs: AngularFirestore){
    // TODO: this might not be the best place, but it's a start
    // this._appUsers = _fs.collection(this.appUserCollectionName).snapshotChanges();
    // console.log('this._appUsers');
    // console.log(this._appUsers);
  }

  createAppUser(appUser: AppUser){
    return this._fs.collection(this.appUserCollectionName).add(appUser);
  }

  readAppUsers(){
    return this._fs.collection(this.appUserCollectionName).snapshotChanges;
  }

  updateAppUser(appUser: AppUser){
    delete appUser.id;
    this._fs.doc(this.appUserCollectionName + '/' + appUser.id ).update(appUser);
  }

  deleteAppUser(appUserId: string){
    this._fs.doc(this.appUserCollectionName + '/' + appUserId).delete();
  }


  // findAppUsers(): Observable<AppUser[]>{
  //   return this._db.list(this.appUserCollectionName)
  //     .do()
  // }

  // findAllAppUsers(): Observable<AppUser[]> {
  //   return this._fs
  //     .list(this.appUserCollectionName)
  //     .valueChanges()
  //     .pipe(
  //       map((data) => {
  //         console.log(data);
  //         return data;
  //       })
  //     ) as Observable<AppUser[]>;
  // }

  // constructor(private fb: FirebaseApp) {}

  // getAll(): AngularFireList<AppUser> {
  //   // return this.appUserList;
  //   throw new Error('Not Implemented!');
  // }

  // get(key: string) {
  //   //this.appUserList.query.get();

  //   // const result = this.db.object(`key/${key}`);
  //   // console.log('firebase client get:');
  //   // console.log(result);
  //   // console.log('firebase client get:');

  //   // return result;
  //   throw new Error('Not Implemented!');
  // }

  // create(appUser: AppUser): any {
  //   //this._db.collection('app_users').doc
  //   // return this.appUserList.push(appUser);
  //   // throw new Error('Not Implemented!');
  // }

  // update(key: string, value: any): Promise<void> {
  //   // return this.appUserList.update(key, value);
  //   throw new Error('Not Implemented!');
  // }

  // delete(key: string): Promise<void> {
  //   // return this.appUserList.remove(key);
  //   throw new Error('Not Implemented!');
  // }

  // deleteAll(): Promise<void> {
  //   // return this.appUserList.remove();
  //   throw new Error('Not Implemented!');
  // }
}
