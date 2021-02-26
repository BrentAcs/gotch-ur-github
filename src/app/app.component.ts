import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUserService} from './services/app-user/app-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private appUserService: AppUserService,
    private appSettingsService: AppSettingsService
  ) {}

  ngOnInit() {
    this.appSettingsService.load();
  }

  ngOnDestroy(): void {

    // THIS IS NOTE WORKING, START HERE

    console.log('header component OnDestroy()');
    alert('boobs!');
    this.appSettingsService.save();
  }
}
