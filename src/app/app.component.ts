import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  AppSettingsService,
  AppUserService,
} from './services/app-user/app-user.service';

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

    co  nsole.log('header component OnDestroy()');
    this.appSettingsService.save();
  }
}
