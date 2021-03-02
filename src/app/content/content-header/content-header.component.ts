import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { AppUsersService } from 'src/app/services/app-users/app-users.service';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css'],
})
export class ContentHeaderComponent extends BaseContentComponent implements OnInit {
  constructor(
    appUsersService: AppUsersService,
    appSettingsService: AppSettingsService
  ) {
    super( appUsersService, appSettingsService, null);
  }

  onSelectedUserChange(appUserName){
  }

  ngOnInit(): void {}
}
