import { Component, Input, OnInit } from '@angular/core';

import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { AppUserService } from 'src/app/services/app-user/app-user.service';
import { GithubClientService } from 'src/app/services/github/github-client.service';
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

  userInfo = 'your content here....';
  onSubmit() {
    const user = this.githubService.getUser().subscribe(
      (user) => {
        this.userInfo = JSON.stringify(user, null, 2);
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(user);
  }
}
