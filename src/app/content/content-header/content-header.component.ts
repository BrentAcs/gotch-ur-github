import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

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
  implements OnInit, AfterViewInit {
  @ViewChild('appUserSelect', { static: true }) appUserSelect: ElementRef;
  //@Input('appUserSelect') appUserSelect: string;

  constructor(
    appUsersService: AppUsersService,
    appSettingsService: AppSettingsService
  ) {
    super(appUsersService, appSettingsService, null);
  }

  onSelectedUserChange(appUserId) {
    console.log('selected User Changed: ' + appUserId);

    console.log('prior selected app user: ');
    console.log(this.appUsersService.selectedAppUser);

    this.appUsersService.setSelectedAppUser(appUserId);

    console.log('post selected app user: ');
    console.log(this.appUsersService.selectedAppUser);
  }

  ngOnInit(): void {
    if (!this.appUsersService.selectedAppUser) {
      console.log('head onInit: ');
      console.log(this.appUserSelect);
      // console.log(this.appUserSelect);
    }
  }

  ngAfterViewInit(): void {
    if (!this.appUsersService.selectedAppUser) {
      console.log('head afterViewInit: ');
      console.log(this.appUserSelect);
    }
  }
}
