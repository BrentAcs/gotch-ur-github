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
    this.appUserSub = this.appUserService.appUserChanged.subscribe(
      (appUser) => {
        this.appUser = appUser;
      }
    );
    // TODO: determine best place load the appuserservice, or is this it?
    this.appUserService.load();

    this.appSettingsSub = this.appSettingsService.appSettingsChanged.subscribe(
      (appSettings) => {
        this.appSettings = appSettings;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.appUserSub) {
      this.appUserSub.unsubscribe();
    }
    if (this.appSettingsSub) {
      this.appSettingsSub.unsubscribe();
    }
  }
}
