import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { GithubClientService } from 'src/app/services/github/github-client.service';

import { AppUserService } from '../../services/app-user/app-user.service';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent
  extends BaseContentComponent
  implements OnInit, OnDestroy {
  @ViewChild('f') homeForm: NgForm;

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

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onSubmit() {
    this.appUserService.save();
  }

  onClearUser() {
    this.appUserService.clear();
  }
}
