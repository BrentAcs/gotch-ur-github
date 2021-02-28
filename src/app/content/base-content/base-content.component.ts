import { Component, OnDestroy, OnInit } from '@angular/core';

import { GithubClientService } from 'src/app/services/github/github-client.service';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { AppUsersService } from 'src/app/services/app-users/app-users.service';

@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css'],
})
export class BaseContentComponent implements OnInit, OnDestroy {
  constructor(
    public appUsersService: AppUsersService,
    public appSettingsService: AppSettingsService,
    public githubService: GithubClientService
  ) {}

  ngOnInit(): void {
    // TODO: is this the correct way of doing this??
    this.appUsersService.selectedAppUserChanged.next(
      this.appUsersService.selectedAppUser
    );
    this.appSettingsService.appSettingsChanged.next(
      this.appSettingsService.appSettings
    );
  }

  ngOnDestroy(): void {}
}
