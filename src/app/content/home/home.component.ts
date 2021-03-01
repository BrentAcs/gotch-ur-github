import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { GithubClientService } from 'src/app/services/github/github-client.service';

import { AppUsersService } from '../../services/app-users/app-users.service';
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
    appUsersService: AppUsersService,
    appSettingsService: AppSettingsService,
    githubService: GithubClientService
  ) {
    super(appUsersService, appSettingsService, githubService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onNewUser() {}

  onDeleteUser() {
    this.appUsersService.deleteAppUser();
    this.homeForm.reset();
  }

  onSubmit() {
    // TODO: going to need an 'editMode' property or similar soon

    const savedUser = this.appUsersService.createAppUser().then((result) => {
      console.log('home comp, added user:');
      console.log(result);
      this.appUsersService.selectedAppUser.id = result.id;
    });

    console.log(this.appUsersService.selectedAppUser);
  }
}
