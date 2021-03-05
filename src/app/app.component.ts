import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUsersService } from './services/app-users/app-users.service';
import { AppUser } from './shared/app-user.model';

import * as CryptoJS from 'crypto-js';
import { Base64 } from 'crypto-js/enc-base64';
import { Utf8 } from 'crypto-js/enc-utf8';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private appUserService: AppUsersService,
    private appSettingsService: AppSettingsService
  ) {}

  ngOnInit() {
    this.appUserService.readAppUsers().subscribe((data) => {
      this.appUserService.appUsers = data.map((ele) => {
        const encryptedAppUser = {
          id: ele.payload.doc.id,
          // for 'as {}', see: https://stackoverflow.com/questions/51189388/typescript-spread-types-may-only-be-created-from-object-types/51193091
          ...(ele.payload.doc.data() as {}),
        } as AppUser;
        const appUser = AppUser.decrypt(encryptedAppUser);

        if (this.appUserService.selectedAppUser === null) {
          console.log('setting selected app user from app-root: ' + appUser.id);
          this.appUserService.setSelectedAppUser(appUser.id);
        }

        return appUser;
      });
    });

    this.appSettingsService.load();
  }
}
