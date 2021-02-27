import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { AppUser } from 'src/app/shared/app-user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseClientService {
  appUserList: AngularFireList<AppUser> = null;
  dbPath = '/app-users';

  constructor(private db: AngularFireDatabase) {
    this.appUserList = db.list(this.dbPath);
  }

  getAll(): AngularFireList<AppUser> {
    return this.appUserList;
  }

  get(): ApoUser{
    this.appUserList.que
  }

  create(appUser: AppUser): any {
    return this.appUserList.push(appUser);
  }

  update(key: string, value: any): Promise<void> {
    return this.appUserList.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.appUserList.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.appUserList.remove();
  }

  // private baseUrl = 'https://gotchurgithub-default-rtdb.firebaseio.com/';
  // private appUsersCol = 'app-users.json';

  // constructor(private http: HttpClient) {}

  // postAppUser(appUser: AppUser) {
  //   this.http
  //     .post(this.baseUrl + this.appUsersCol, appUser)
  //     .subscribe((response) => {
  //       console.log(response);
  //     }),
  //     (error) => {
  //       console.error(error);
  //     };
  // }

  // getAppUser(name: string){
  //   // this.http.get<PersistedAppUser>(this.baseUrl + this.appUsersCol);
  // }
}
