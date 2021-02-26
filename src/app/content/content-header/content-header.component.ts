import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { AppUserService } from 'src/app/services/app-user/app-user.service';
import { AppSettings } from 'src/app/shared/app-settings.model';
import { AppUser } from 'src/app/shared/app-user.model';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css'],
})
export class ContentHeaderComponent implements OnInit, OnDestroy {
  appUserSub: Subscription;
  appSettingsSub: Subscription;
  // NOTE: content header needs to new up it's app user so it's not undefined.
  appUser: AppUser = new AppUser();
  appSettings: AppSettings = new AppSettings();

  constructor(
    private appUserService: AppUserService,
    private appSettingsService: AppSettingsService
  ) {
    this.appUserSub = this.appUserService.appUserChanged.subscribe(
      (appUser) => {
        this.appUser = appUser;
      }
    );

    this.appSettingsSub = this.appSettingsService.appSettingsChanged.subscribe(
      (appSettings) => {
        this.appSettings = appSettings;
      }
    );
  }

  public get hasAppUserService() {
    return this.appUserService !== null;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.appUserSub.unsubscribe();
    this.appSettingsSub.unsubscribe();
  }
}
