import { Component, Input, OnInit } from '@angular/core';

import { AppSettingsService, AppUserService } from 'src/app/services/app-user/app-user.service';
import { GithubClientService } from 'src/app/services/github/github-client.service';
import { AppUser } from 'src/app/shared/appuser.model';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent extends BaseContentComponent implements OnInit {
  constructor(
    appUserService: AppUserService,
    appSettingsService: AppSettingsService,
    githubService: GithubClientService
  ) {
    super(appUserService, appSettingsService, githubService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  onSubmit() {
    console.log('users form submitting...');
    // if (this.appUser.useAccessToken) {
    // } else {
    // }
  }
}
