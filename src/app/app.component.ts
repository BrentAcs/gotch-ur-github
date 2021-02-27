import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUserService } from './services/app-user/app-user.service';
import { AppUser } from './shared/app-user.model';
import { PersistedAppUser } from './shared/persisted-app-user.model';
import { FirebaseClientService } from './services/firebase/firebase-client.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  appUsers = null;

  constructor(
    private appUserService: AppUserService,
    private appSettingsService: AppSettingsService,
    private firebaseService: FirebaseClientService,
  ) {}

  ngOnInit() {
    this.appUserService.load();
    this.appSettingsService.load();

    // https://bezkoder.com/angular-10-firebase-crud/
  }

  onCreate() {
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

    const persistedUser = PersistedAppUser.toPersisted(user);
    const persistedUser2 = PersistedAppUser.toPersisted(user2);

    console.log('persistedUser before');
    console.log(persistedUser);
    this.firebaseService.create(persistedUser);
    console.log(persistedUser);

    console.log('persistedUser2 before');
    console.log(persistedUser2);
    this.firebaseService.create(persistedUser2);
    console.log(persistedUser2);

    // console.log('pushing to firebase');
    // this.appUsersRef = this.firebase.list(this.dbPath);
    // this.appUsersRef.push(persistedUser2).then(() => {
    //   console.log('Created new item successfully!');
    // });

    const user10 = PersistedAppUser.fromPersisted(persistedUser);
    const user11 = PersistedAppUser.fromPersisted(persistedUser2);
  }


  onFetch(){
    console.log('fetching from firebase');

    this.firebaseService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.appUsers = data;
        console.log(data);
      });;

    // this.appUsersRef
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) =>
    //       changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
    //     )
    //   )

    //   .subscribe((data) => {
    //     console.log(data);
    //     // this.tutorials = data;
    //   });
  }

}
