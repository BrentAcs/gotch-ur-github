import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUserService } from './services/app-user/app-user.service';
import { FirebaseClientService } from './services/firebase/firebase-client.service';
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
    private appSettingsService: AppSettingsService,
    private firebase: FirebaseClientService,
  ) {}

  ngOnInit() {
    this.appUserService.load();
    this.appSettingsService.load();

    const user = new AppUser(
      'Brent',
      'Test-acces-token-please-ignore',
      true,
      'kitty',
      true
    );
    const user2 = new AppUser(
      'Connor',
      'Test-acces-token-please-ignore-2',
      true,
      'lucas',
      true
    );
    // console.log('app user:');
    // console.log(user);

    const persistedUser = PersistedAppUser.toPersisted(user);
    const persistedUser2 = PersistedAppUser.toPersisted(user2);
    // console.log('persisted app user:');
    // console.log(persistedUser);

    console.log('test posting app user.');
    this.firebase.postAppUser(persistedUser);
    this.firebase.postAppUser(persistedUser2);

    const user10 = PersistedAppUser.fromPersisted(persistedUser);
    const user11 = PersistedAppUser.fromPersisted(persistedUser2);
    console.log('app user 2:');
    console.log(user2);
  }
}
