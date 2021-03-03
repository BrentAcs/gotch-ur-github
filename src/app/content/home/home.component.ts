import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppUsersService } from '../../services/app-users/app-users.service';
import { BaseContentComponent } from '../base-content/base-content.component';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { GithubClientService } from 'src/app/services/github/github-client.service';
import { AppUser } from 'src/app/shared/app-user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent
  extends BaseContentComponent
  implements OnInit, OnDestroy {
  @ViewChild('f') homeForm: NgForm;
  userName = '';
  accessToken = '';
  secretKey = '';
  persistSecretKey = false;
  newUserMode = false;

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

  onNewUser() {
    this.newUserMode = true;
    setTimeout(() => {
      document.getElementById('userName').focus();
    }, 0);
  }

  canDeleteUser() {
    const canDelete =
      this.newUserMode &&
      this.hasSelectedAppUser &&
      this.appUsersService.selectedAppUser.id !== null;
    return canDelete;
  }

  onDeleteUser() {
    this.appUsersService.deleteAppUser();
    this.homeForm.reset();
  }

  onSubmit() {
    console.log('submitting');
    console.log(this.persistSecretKey);

    const newAppUser = new AppUser(
      this.userName,
      this.accessToken,
      this.secretKey,
      this.persistSecretKey.valueOf()
    );
    console.log(newAppUser);
    const savedUser = this.appUsersService
      .createAppUser(newAppUser)
      .then((result) => {
        console.log('home comp, added user:');
        console.log(result);
        this.appUsersService.selectedAppUser.id = result.id;
      });
    this.newUserMode = false;
  }
}
