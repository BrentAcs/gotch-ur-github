import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  userId = '';
  userName = '';
  accessToken = '';
  secretKey = '';
  persistSecretKey = false;
  currentMode = EditModes.None;

  constructor(
    appUsersService: AppUsersService,
    appSettingsService: AppSettingsService,
    githubService: GithubClientService
  ) {
    super(appUsersService, appSettingsService, githubService);
  }

  get inNoneMode() {
    return this.currentMode === EditModes.None;
  }

  get inNewMode() {
    return this.currentMode === EditModes.New;
  }

  get inEditMode() {
    return this.currentMode === EditModes.Edit;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onNewUser() {
    this.currentMode = EditModes.New;
    this.focusUserNameInput();
  }

  onEditUser(appUserId: string) {
    console.log('OnEditUser: ' + appUserId);
    if (!appUserId) {
      throw new Error('Trying to edit user with no Id.');
    }

    const appUser = this.appUsersService.getAppUser(appUserId);
    this.userId = appUser.id;
    this.userName = appUser.name;
    this.accessToken = appUser.accessToken;
    this.secretKey = appUser.secretKey;
    this.persistSecretKey = appUser.persistSecretKey;

    this.currentMode = EditModes.Edit;
    this.focusUserNameInput();
  }

  canDeleteUser(appUserId: string) {
    const canDelete = (this.inNewMode || this.inEditMode) && appUserId;
    return canDelete;
  }

  onDeleteUser(appUserId: string) {
    this.appUsersService.deleteAppUser(appUserId);
  }

  canSaveUser() {
    if (this.inNoneMode) {
      return false;
    }
    if (this.homeForm.valid && this.userName !== '') {
      return true;
    }

    return false;
  }

  onCreateUser() {
    console.log('submitting');
    const newAppUser = new AppUser(
      this.userName,
      this.accessToken,
      this.secretKey,
      this.persistSecretKey.valueOf(),
      this.userId
    );

    console.log(newAppUser);

    if (this.inNewMode) {
      console.log('in new mode');
      const savedUser = this.appUsersService
        .createAppUser(newAppUser)
        .then((result) => {
          console.log('home comp, added user:');
          console.log(result);
          this.appUsersService.selectedAppUser.id = result.id;
        });
    } else if (this.inEditMode) {
      console.log('in edit mode');
      this.appUsersService
        .updateAppUser(this.userId, newAppUser)
        .then((result) => {
          console.log('home comp, updated user:');
          console.log(result);
          // this.appUsersService.selectedAppUser.id = result.id;
        });
    }

    this.userId = '';
    this.homeForm.reset();
    this.currentMode = EditModes.None;
  }

  onCancel() {
    this.homeForm.reset();
    this.currentMode = EditModes.None;
  }

  focusUserNameInput() {
    setTimeout(() => {
      document.getElementById('userName').focus();
    }, 0);
  }
}

export enum EditModes {
  None,
  New,
  Edit,
}
