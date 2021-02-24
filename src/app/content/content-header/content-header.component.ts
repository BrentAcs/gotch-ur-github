import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppUserService } from '../../services/app-user/app-user.service';
import { AppUser } from '../../shared/appuser.model';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css'],
})
export class ContentHeaderComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  // NOTE: content header needs to new up it's app user so it's not undefined.
  appUser: AppUser = new AppUser();

  constructor(private appUserService: AppUserService) {
    this.subscription = this.appUserService.appUserChanged.subscribe((appUser) => {
      this.appUser = appUser;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('content header#OnDestroy')
    this.subscription.unsubscribe();
  }
}
