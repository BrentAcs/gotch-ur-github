import { Component, OnDestroy, OnInit } from '@angular/core';

import { GithubClientService } from 'src/app/services/github/github-client.service';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { AppUserService } from 'src/app/services/app-user/app-user.service';

@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css'],
})
export class BaseContentComponent implements OnInit, OnDestroy {
  constructor(
    public appUserService: AppUserService,
    public appSettingsService: AppSettingsService,
    public githubService: GithubClientService
  ) {}

  ngOnInit(): void {
      // TODO: is this the correct way of doing this??
    this.appUserService.appUserChanged.next(this.appUserService.appUser);
    this.appSettingsService.appSettingsChanged.next(
      this.appSettingsService.appSettings
    );
  }

  ngOnDestroy(): void {
  }
}
