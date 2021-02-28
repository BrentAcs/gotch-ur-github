import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUsersService } from './services/app-users/app-users.service';
import { AppUser } from './shared/app-user.model';
import { FirebaseClientService } from './services/firebase/firebase-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  _appUsers: AppUser[] = [];

  constructor(
    private appUserService: AppUsersService,
    private appSettingsService: AppSettingsService,
    private _fs: FirebaseClientService
  ) {}

  ngOnInit() {
    this.appUserService.load().subscribe((data) => {
      this.appUserService.appUsers = data.map((ele) => {
        const appUser = {
          id: ele.payload.doc.id,
          // for 'as {}', see: https://stackoverflow.com/questions/51189388/typescript-spread-types-may-only-be-created-from-object-types/51193091
          ...(ele.payload.doc.data() as {}),
        } as AppUser;

        console.log('mapping app user');
        return appUser;
      });
    });

    this.appSettingsService.load();

    console.log('app component, app users: ');
    console.log(this._appUsers);
  }

  // onFetch() {
  //   console.log('fetching from firebase');
  //   console.log(this._appUsers);
  // }
}
