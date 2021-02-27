import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppUser } from 'src/app/shared/app-user.model';
import { PersistedAppUser } from 'src/app/shared/persisted-app-user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseClientService {
  private baseUrl = 'https://gotchurgithub-default-rtdb.firebaseio.com/';
  private appUsersCol = 'app-users.json';

  constructor(private http: HttpClient) {}

  postAppUser(appUser: AppUser) {
    this.http
      .post(this.baseUrl + this.appUsersCol, appUser)
      .subscribe((response) => {
        console.log(response);
      }),
      (error) => {
        console.error(error);
      };
  }

  getAppUser(name: string){
    // this.http.get<PersistedAppUser>(this.baseUrl + this.appUsersCol);
  }
}
