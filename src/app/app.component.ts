import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUserService } from './services/app-user/app-user.service';

// Test comment
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private appUserService: AppUserService,
    private appSettingsService: AppSettingsService
  ) {}

  ngOnInit() {
    this.appUserService.load();
    this.appSettingsService.load();
  }
}
