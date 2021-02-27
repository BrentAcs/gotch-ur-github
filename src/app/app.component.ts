import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUserService } from './services/app-user/app-user.service';
import { ConsoleLoggingService, ILoggingService } from './services/logging-service/logging.service';
import { AppUser } from './shared/app-user.model';
import { PersistedAppUser } from './shared/persisted-app-user.model';

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

    const user = new AppUser(
      'Brent',
      '962989e3968bbef8398f0238d6dc3784d827b799',
      true,
      'kitty',
      true
    );
    console.log('app user:');
    console.log(user);

    const persistedUser = PersistedAppUser.toPersisted(user);
    console.log('persisted app user:');
    console.log(persistedUser);

    const user2 = PersistedAppUser.fromPersisted(persistedUser);
    console.log('app user 2:');
    console.log(user2);
  }
}
