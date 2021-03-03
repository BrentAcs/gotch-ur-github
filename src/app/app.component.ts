import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUsersService } from './services/app-users/app-users.service';
import { AppUser } from './shared/app-user.model';

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
  ) {}

  ngOnInit() {
    this.appUserService.load().subscribe((data) => {
      this.appUserService.appUsers = data.map((ele) => {
        const encryptedAppUser = {
          id: ele.payload.doc.id,
          // for 'as {}', see: https://stackoverflow.com/questions/51189388/typescript-spread-types-may-only-be-created-from-object-types/51193091
          ...(ele.payload.doc.data() as {}),
        } as AppUser;
        const appUser = AppUser.decrypt(encryptedAppUser);

        if (this.appUserService.selectedAppUser !== null) {
          this.appUserService.selectedAppUser = appUser;
        }

        // console.log('mapping app user');
        // console.log(appUser);
        return appUser;
      });
    });

    this.appSettingsService.load();
  }
}
