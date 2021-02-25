import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppUserService } from 'src/app/services/app-user/app-user.service';
import { GithubClientService } from 'src/app/services/github/github-client.service';
import { AppUser } from 'src/app/shared/appuser.model';

@Component({
  selector: 'app-base-content',
  templateUrl: './base-content.component.html',
  styleUrls: ['./base-content.component.css'],
})
export class BaseContentComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  subscription: Subscription;

  constructor(
    protected appUserService: AppUserService,
    protected githubService: GithubClientService
  ) {}

  ngOnInit(): void {
    this.subscription = this.appUserService.appUserChanged.subscribe(
      (appUser) => {
        this.appUser = appUser;
      }
    );
    this.appUserService.load();
  }

  ngOnDestroy(): void {
    console.log('base OnDestroy()');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
