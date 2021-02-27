import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUserService } from './services/app-user/app-user.service';
import { ConsoleLoggingService, ILoggingService } from './services/logging-service/logging.service';

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

    // const logger: ILoggingService = new ConsoleLoggingService();
    // logger.log('test log messaeg.');
    // logger.info('test info messaeg.');
    // logger.warn('test warn messaeg.');
    // logger.error('test error messaeg.');

    // //logger.enabled = false;
    // logger.log('test log messaeg.');
    // logger.info('test info messaeg.');
    // logger.warn('test warn messaeg.');
    // logger.error('test error messaeg.');
  }
}
