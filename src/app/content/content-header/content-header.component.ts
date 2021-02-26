import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from 'src/app/services/app-settings/app-settings.service';
import { AppUserService } from 'src/app/services/app-user/app-user.service';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css'],
})
export class ContentHeaderComponent implements OnInit {
  constructor(
    public appUserService: AppUserService,
    public appSettingsService: AppSettingsService
  ) {
    }

  // TODO: figure out how to hide appsettings for content that doesn't use it.
  // public get hasAppUserService() {
  //   return this.appUserService !== null;
  // }

  ngOnInit(): void {}

  // TODO: not sure if this is the best way to handle, but hey, it's work to start with.
  onUserAccessTokenChange(event){
    this.appSettingsService.save();
  }
}
