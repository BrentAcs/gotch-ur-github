import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppUserService } from 'src/app/services/app-user/app-user.service';
import { AppUser } from 'src/app/shared/appuser.model';

@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css'],
})
export abstract class BaseContentComponent implements OnInit, OnDestroy {
  public appUser: AppUser;
  currentUserName = '';
  subscription: Subscription;

  constructor(protected appUserService: AppUserService) {}

  ngOnInit(): void {
    console.log('base OnInit()');
    this.subscription = this.appUserService.appUserChanged.subscribe(
      (appUser) => {
        this.appUser = appUser;
        this.currentUserName = appUser.name;
      }
    );
    this.appUserService.load();
  }

  ngOnDestroy(): void {
    console.log('base OnDestroy()');
    if( this.subscription ){
      this.subscription.unsubscribe();
    }
  }
}
