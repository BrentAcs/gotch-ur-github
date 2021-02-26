import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { GithubClientService } from 'src/app/services/github/github-client.service';
import { AppSettings } from 'src/app/shared/app-settings.model';
import { AppUser } from 'src/app/shared/app-user.model';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { AppUserService } from 'src/app/services/app-user/app-user.service';

@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css'],
})
export class BaseContentComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  appUserSub: Subscription;
  appSettings: AppSettings;
  appSettingsSub: Subscription;

  constructor(
    protected appUserService: AppUserService,
    protected appSettingsService: AppSettingsService,
    protected githubService: GithubClientService
  ) {}

  ngOnInit(): void {
    console.log('base OnInit');

    this.appUserSub = this.appUserService.appUserChanged.subscribe(
      (appUser) => {
        console.log('base content, setting app user.')
        this.appUser = appUser;
      }
    );

    this.appSettingsSub = this.appSettingsService.appSettingsChanged.subscribe(
      (appSettings) => {
        console.log('base content, setting app settings.');
        this.appSettings = appSettings;
      }
    );

    // TODO: is this the correct way of doing this??
    this.appUserService.appUserChanged.next(this.appUserService.appUser);
    this.appSettingsService.appSettingsChanged.next(this.appSettingsService.appSettings);
  }

  ngOnDestroy(): void {
    console.log('base OnDestroy');

    if (this.appUserSub) {
      this.appUserSub.unsubscribe();
    }
    if (this.appSettingsSub) {
      this.appSettingsSub.unsubscribe();
    }
  }
}
