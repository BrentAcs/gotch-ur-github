import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { AppUsersService } from 'src/app/services/app-users/app-users.service';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css'],
})
export class ContentHeaderComponent implements OnInit {
  constructor(
    public appUsersService: AppUsersService,
    public appSettingsService: AppSettingsService
  ) {}

  // TODO: figure out how to hide appsettings for content that doesn't use it.
  // public get hasAppUserService() {
  //   return this.appUserService !== null;
  // }

  onSelectedUserChange(appUserName){

  }

  ngOnInit(): void {}
}
