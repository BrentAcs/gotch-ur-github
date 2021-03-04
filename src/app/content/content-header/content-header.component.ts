import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { AppUsersService } from 'src/app/services/app-users/app-users.service';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css'],
})
export class ContentHeaderComponent
  extends BaseContentComponent
  implements OnInit {
  @ViewChild('appUserSelect', {static: true}) appUserSelect: ElementRef;
  selectedAppUserId = '';

  constructor(
    appUsersService: AppUsersService,
    appSettingsService: AppSettingsService
  ) {
    super(appUsersService, appSettingsService, null);
  }

  onSelectedUserChange(appUserId) {
    console.log('selected User Changed: ' + appUserId);
    console.log('selected User Id: ' + this.selectedAppUserId);
  }

  ngOnInit(): void {
    if (this.selectedAppUserId === '') {
      console.log('setting selected user.');
      // this.appUserSelect.nativeElement.selectedIndex = 0;
    }
  }
}
