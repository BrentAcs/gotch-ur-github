import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  AppSettingsService,
  AppUserService,
} from 'src/app/services/app-user/app-user.service';
import { GithubClientService } from 'src/app/services/github/github-client.service';
import { AppSettings, AppUser } from 'src/app/shared/appuser.model';

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
