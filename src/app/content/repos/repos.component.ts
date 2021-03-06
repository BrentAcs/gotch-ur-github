import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { AppUserService } from 'src/app/services/app-user/app-user.service';
import { GithubClientService } from 'src/app/services/github/github-client.service';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent extends BaseContentComponent implements OnInit {
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
}
