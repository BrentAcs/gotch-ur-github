import { Component, OnInit } from '@angular/core';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUserService } from './services/app-user/app-user.service';
import { AppUser } from './shared/app-user.model';
import { FirebaseClientService } from './services/firebase/firebase-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  _appUsers: AppUser[] = [];

  constructor(
    private appUserService: AppUserService,
    private appSettingsService: AppSettingsService,
    private _fs: FirebaseClientService
  ) {}

  ngOnInit() {
    this.appUserService.load();
    this.appSettingsService.load();

    this._fs.readAppUsers().subscribe((data) => {
      this._appUsers = data.map((ele) => {
        return {
          id: ele.payload.doc.id,
          // for 'as {}', see: https://stackoverflow.com/questions/51189388/typescript-spread-types-may-only-be-created-from-object-types/51193091
          ...(ele.payload.doc.data() as {}),
        } as AppUser;
      });
    });


    // this.policyService.getPolicies().subscribe((data) => {
    //   this.policies = data.map((e) => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data(),
    //     } as Policy;
    //   });
    // });
  }

  onCreate() {
    // const user = new AppUser(
    //   'Brent',
    //   'Test-acces-token-please-ignore',
    //   true,
    //   'kitty',
    //   true
    // );
    // const user2 = new AppUser(
    //   'Connor',
    //   'Test-acces-token-please-ignore-2',
    //   true,
    //   'lucas',
    //   true
    // );
    // const persistedUser = PersistedAppUser.toPersisted(user);
    // const persistedUser2 = PersistedAppUser.toPersisted(user2);
    // console.log('persistedUser before');
    // console.log(persistedUser);
    // this.firebaseService.create(persistedUser);
    // console.log(persistedUser);
    // console.log('persistedUser2 before');
    // console.log(persistedUser2);
    // this.firebaseService.create(persistedUser2);
    // console.log(persistedUser2);
    // const user10 = PersistedAppUser.fromPersisted(persistedUser);
    // const user11 = PersistedAppUser.fromPersisted(persistedUser2);
  }

  onFetch() {
    console.log('fetching from firebase');
    console.log(this._appUsers);

    // this.appUsers = this.firebaseService.findAppUsers();
    // console.log(this.appUsers);

    // this.firebaseService
    //   .getAll()
    //   .snapshotChanges()
    //   .pipe(
    //     map((changes) =>
    //       changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
    //     )
    //   )
    //   .subscribe((data) => {
    //     this.appUsers = data;
    //     console.log(data);
    //   });

    // this.firebaseService
    //   .get('-MUabcBX74EyawTUpyL9')
    //   .snapshotChanges()
    //   .subscribe((data) => {
    //     this.appUsers = data;
    //     console.log(data);
    //   });
  }
}
